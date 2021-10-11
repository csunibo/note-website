import { notion } from "../../notion"
import type { NextApiRequest, NextApiResponse } from 'next'

// https://developers.notion.com/reference/get-block-children

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // https://www.notion.so/angelohuang/Primo-libro-4a94fc258ba5465cb9a2e945b8ad30c6
    const { block_id } = Array.isArray(req.query) ? req.query[0] : req.query;
    (async () => {
        const response = await notion.blocks.children.list({
            block_id: block_id,
            page_size: 50,
        });
        // TODO, handle errors with Notion APIErrorCode https://github.com/makenotion/notion-sdk-js
        res.status(200).json(response)
    })();
}