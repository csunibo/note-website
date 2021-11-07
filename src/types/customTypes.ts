import type {Document} from "mongodb"

// Study this file to have a better use of modules
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
// Io(flecart) non lo ho ancora indagato per bene del tutto, dovrei farlo.

export type mongoResponse = {
    code: number,
    message: {
        data: Document,
        error?: never
    } | {
        error: string,
        data?: never
    }
}

export type standardResponse = {
    error: {
        message: String;
    };
    code: number;
    code_meaning: string;
    data?: never;
} | {
    data: {
        message: string;
    };
    code: number;
    code_meaning: string;
    error?: never;
}

export type noteRequestExistance = {
    sectionId: boolean,
    author: boolean,
    name: boolean,
    type: boolean,
    pdf: boolean,
    link: boolean,
    video: boolean
}