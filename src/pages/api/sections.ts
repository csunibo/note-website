import type { NextApiRequest, NextApiResponse } from 'next'
import { Section } from "../../types/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise(_ => {
        if (req.method != "GET") {
            res.status(400).json({error: "Invalid request, only GET is supported"});
            return;
        }

        Section.find(req.query, (err, data) => {
            if (err) {
                res.status(400).json({error: err});
            } else {
                res.status(200).json({data: data});
            }
        })
        return;
    })
}