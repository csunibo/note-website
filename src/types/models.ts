import mongoose, { Date } from "mongoose";

const isLocal = process.env.LOCAL;
const MONGODB_URI = isLocal ? process.env.DB_LOCAL_CONN_STRING! : process.env.DB_CONN_STRING!
if (!isLocal || !MONGODB_URI) {
    console.error("Local environment variables not set, quitting");
    process.exit(1);
} 

if (!mongoose.connections[0].readyState) {
    mongoose.connect(MONGODB_URI)
    .catch(error => console.error(error));
}


const CourseSchema = new mongoose.Schema(
    {
        nome: String,
        id: String,
        n_sezioni: Number,
        virtuale: String,
        teams: String,
        website: String,
        last_update: Date,
        professors: [String]
    },
);

// Prevent OverwriteModelError with existing models
export const Course =  mongoose.models.courses || mongoose.model("courses", CourseSchema);

export interface Appunti {
    id: String,
    author: String,
    likes: Number,
    last_modified: Date
    type: String, // TODO add types for this
    // ADD some field depending on the type
};

const SectionsSchema = new mongoose.Schema({
    nome: String,
    id: String,
    n_appunti: Number
    // Add appunti, i have error that tells me appunti in only a type
    // but this needs value
});
export const Section = mongoose.models.sections || mongoose.model("sections", SectionsSchema);