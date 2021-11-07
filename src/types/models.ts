import mongoose from "mongoose";

const isLocal = process.env.LOCAL;
const MONGODB_URI = isLocal ? process.env.DB_LOCAL_CONN_STRING! : process.env.DB_CONN_STRING!
if (!MONGODB_URI) {
    console.error("Environment variables not set, quitting...");
    process.exit(1);
} 

if (!mongoose.connections[0].readyState) {
    mongoose.connect(MONGODB_URI)
    .catch(error => console.error(error));
}

// TODO: add pre(save) and pre(validate) to the schemas
// see here https://mongoosejs.com/docs/subdocs.html#what-is-a-subdocument
// TODO: dividere i modelli in più file, in una cartella models, non unico file
// così puoi gestire meglio i save e validate
// TODO: mettere required agli schema:
// es: invece di 
// nome: String
// fare
// nome: {type: String, required: true, default?} // e simili

export interface Courses {
    nome: string;
    id: string;
    n_sezioni: number;
    virtuale: string;
    teams: string;
    website: string;
    last_update: string;
    professors: string[]
}
const CourseSchema = new mongoose.Schema<Courses>({
        nome: String,
        id: String,
        n_sezioni: Number,
        virtuale: String,
        teams: String,
        website: String,
        last_update: String,
        professors: [String]
});

// Prevent OverwriteModelError with existing models thanks to ||
export const Course =  mongoose.models.courses || mongoose.model("courses", CourseSchema);

// TODO: type should only be link pdf or vide
// should be exclusive but this interface allows doubles
export interface Appunti {
    id: String,
    author: String,
    likes: Number,
    isValid: boolean,
    last_modified: String,
    type: String, 
    link?: String,
    pdf?: String,
    video?: String
};

const AppuntiSchema = new mongoose.Schema<Appunti>({
    id: String,
    author: String,
    likes: Number,
    isValid: Boolean,
    last_modified: String,
    type: String, 
    link: String,
    pdf: String,
    video: String
});

export interface Sections {
    nome: string;
    id: string;
    n_appunti: number;
    appunti: Appunti[];
}

const SectionsSchema = new mongoose.Schema<Sections>({
    nome: String,
    id: String,
    n_appunti: Number,
    appunti: [AppuntiSchema]
});
export const Section = mongoose.models.sections || mongoose.model("sections", SectionsSchema);