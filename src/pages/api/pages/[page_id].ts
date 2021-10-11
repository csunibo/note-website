import { notion } from "../notion"
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // https://www.notion.so/angelohuang/Primo-libro-4a94fc258ba5465cb9a2e945b8ad30c6
    // This Array.isArray is necessary because req.query can return string | string[]
    // But i just want the first one.
    const { page_id } = Array.isArray(req.query) ? req.query[0] : req.query;
    (async () => {
        const response = await notion.pages.retrieve({ page_id: page_id });
        // TODO, handle errors with Notion APIErrorCode https://github.com/makenotion/notion-sdk-js
        res.status(200).json(response)
    })();
}