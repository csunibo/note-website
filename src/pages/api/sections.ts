import { getMongo } from './mongo';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const mongo = await getMongo(true);
    if (!mongo) {
        res.status(502).json({ error: "Could not enstablish connection with the mongo Database. Contact server administrator"});
        return;
    }
    const courses = mongo.collection('sections');
    if (!courses) {
        res.status(502).json({error: "Could not find the sections collection. Contact server administrator"});
    }

    const data = await courses.find(req.query).toArray();
    res.status(200).json({data: data});
    return;
}