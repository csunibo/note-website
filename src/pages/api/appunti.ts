import type { NextApiRequest, NextApiResponse } from 'next'
import { Section, Appunti } from "../../types/models";
import type {noteRequestExistance, standardResponse} from "../../types/customTypes"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method != "POST") {
        res.status(400).json({error: "Invalid request, only POST is supported"});
        return;
    }
    // TODO: check if user is authenticated with Telegram before letting him posting
    // The field author should be found from this middleware
    const checkRes = checkRequest(req.query);
    if (checkRes.error != undefined) {
        res.status(checkRes.code).json(checkRes);
        return;
    }
    
    const updateStatus = await addNote(req.query);

    res.status(updateStatus.code).json(updateStatus);
}

async function addNote(note: NextApiRequest["query"]) {
    let doc = await Section.findOne({id: note.sectionId}, "appunti").exec();
    if (!doc) {
        return {error: {message: "Could not find the document, probably bad id"}, code: 404, code_meaning:"Not Found"};
    } else if (doc.$error) {
        return {error: {message: doc.$error.reason}, code: 500, code_meaning: "Internal error, contact server administrator"}
    }

    const newNote: Appunti = getNewNote(note, doc.appunti);
    const addNoteResult = await Section.updateOne(
        {id: note.sectionId},
        {$push: {appunti: newNote}}
    );
    if (addNoteResult.modifiedCount != 1) {
        return {error: {message: "Couldn't add the note to the database"}, code: 500, code_meaning: "Unknown error"};
    }

    await Section.findOneAndUpdate({id: note.sectionId}, {$inc: {n_appunti: 1}});
    return {data: {message: "Note added correctly to database"}, code: 201, code_meaning: "Fullfilled"};
}


function getNewNote(note: NextApiRequest["query"], appunti: Appunti[]): Appunti {
    let noteId: string = getNoteId(appunti, note.sectionId);

    let newNote: Appunti = {
        id: noteId,
        author: note.author as string,
        likes: 0,
        isValid: false,
        last_modified: new Date().toISOString(),
        type: note.type as string,
        link: note.link as string,
        pdf: note.pdf as string,
        video: note.video as string
    }

    return newNote;
}


function getNoteId(appunti: Appunti[], sectionId: string|string[]):string {
    let lastNote = appunti[appunti.length - 1] || undefined;
    let noteId: string;
    if (lastNote) {
        // Ricorda il formato di ID appunto:
        // 1-1-00013 (id_appunto)-(id_sezione)-(id_corso)
        let currentId = lastNote.id.split("-");
        currentId[0] = String(Number(currentId[0]) + 1);
        noteId = currentId.join("-");
    } else {
        noteId = "1-" + sectionId;
    }

    return noteId;
}


function checkRequest(query: NextApiRequest["query"]): standardResponse {
    // TODO: adapt this function to mongoose model level, not API level, there is a mix of responsibilities
    // Check https://mongoosejs.com/docs/validation.html
    const fieldExists = getFieldExistance(query);
    if (hasMissingFields(fieldExists, query.type)) {
        const errorMessage = getErrorMessage(fieldExists, query.type);
        return {error: {message: errorMessage}, code: 400, code_meaning: "Bad Request"};
    }

    if (query.type == "link" && !isValidUrl(query.link)) {
        return {error: {message: "This is not a notion link"}, code: 400, code_meaning: "Bad Request"}
    }
    
    return {data: {message: "ok"}, code: 200, code_meaning: "All fine"};
}


function isValidUrl(url: string|string[]): boolean {
    let isValid = true;
    const splittedUrl = (url as string).split("/");

    // Example of notion link
    // https://flecart-notes.notion.site/Limiti-b3b1b15767a74696b48d7166604d8898
    if (splittedUrl.length < 3 || splittedUrl[0] != "https:" || splittedUrl[1] != "" || !splittedUrl[2].endsWith("notion.site")) {
        isValid = false;
    }
    return isValid
}


function getFieldExistance(query: NextApiRequest["query"]): noteRequestExistance {
    // STYLEISSUE: should make enums and then a switch in the filter object?
    return ({
        sectionId: query.hasOwnProperty("sectionId"),
        author: query.hasOwnProperty("author"),
        name: query.hasOwnProperty("name"),
        type: query.hasOwnProperty("type"),
        pdf: query.hasOwnProperty("pdf"),
        link: query.hasOwnProperty("link"),
        video: query.hasOwnProperty("video"),
    })
}

function hasMissingFields(fieldExists: noteRequestExistance, type: string | string[]): boolean {
    let fieldIsMissing = true;
    if (
        fieldExists.sectionId  && 
        fieldExists.author      && 
        fieldExists.name        && 
        type != undefined            && 
        (   (type == "pdf" && fieldExists.pdf)      || 
            (type == "link" && fieldExists.link)    || 
            (type == "video" && fieldExists.video)  )
        ){
            fieldIsMissing = false;
    }
    return fieldIsMissing;
}

function getErrorMessage(fieldExists: noteRequestExistance, type: string | string[]): string {
    let errorMessage: string = "These fields are requested but not present: ";
    if (!fieldExists.sectionId) {
        errorMessage += "sectionId "
    }
    
    if (!fieldExists.author) {
        errorMessage += "author "
    }

    if (!fieldExists.name) {
        errorMessage += "name "
    } 

    if (!type) {
        errorMessage += "type "
    } else {
        if (type == "pdf" && !fieldExists.pdf) {
            errorMessage += " pdf";
        }

        if (type == "link" && !fieldExists.link) {
            errorMessage += " link";
        }

        if (type == "video" && !fieldExists.video) {
            errorMessage += " video";
        }
    }

    return errorMessage;
}