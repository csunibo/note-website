import * as mongoDB from "mongodb";
import type {NextApiRequest} from 'next';

// TODO: use dinamic module loading (alias directories) to keep these imports clean
import type {mongoResponse} from "../../customTypes";

export async function getMongo(isLocal: boolean = false) {
    let client: mongoDB.MongoClient;
    try {
        const conn_string: string = isLocal ? process.env.DB_LOCAL_CONN_STRING! : process.env.DB_CONN_STRING!
        client = new mongoDB.MongoClient(conn_string);
    } catch {
        console.log("Error connecting to the database. Be sure to have exported needed env vars.");
        return;
    }

    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    console.log(`Connected successfully to database: ${db.databaseName}`);
    return db;
}

export async function getFromCollection(collection: string, query: NextApiRequest["query"]): Promise<mongoResponse> {
    const mongo = await getMongo(true);

    if (!mongo) {
        return {code: 502, message: {error: "Could not enstablish connection with the mongo Database. Contact server administrator"}};
    }
    const courses = mongo.collection(collection);
    if (!courses) {
        return {code: 404, message: {error: `Could not find the ${collection} collection.`}};
    }

    const data = await courses.find(query).toArray();
    return {code: 200, message:{data: data}};
}
