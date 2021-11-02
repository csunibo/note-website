import type { NextApiRequest, NextApiResponse } from 'next'
import { Section } from "../../types/models";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    Section.find(req.query, (err, data) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(data);
        }
    })
}