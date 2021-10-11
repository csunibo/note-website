import { notion } from "../notion"
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Testa: https://www.notion.so/angelohuang/3d8e0444c75c48f092deb6d2e6e91b6f
    // This Array.isArray is necessary because req.query can return string | string[]
    // But i just want the first one.
    const { database_id } = Array.isArray(req.query) ? req.query[0] : req.query;

    (async () => {
        const response = await notion.databases.retrieve({ database_id: database_id });
        // TODO, handle errors with Notion APIErrorCode https://github.com/makenotion/notion-sdk-js
        console.log(response)
        res.status(200).json(response)
    })();
}