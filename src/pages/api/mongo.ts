import * as mongoDB from "mongodb";

export async function getMongo(isLocal: boolean = false) {
    // https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
    // if you don't know tha meaning of the ! at the end.
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
