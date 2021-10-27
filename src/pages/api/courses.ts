import { getFromCollection } from './mongoAPI';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const response = await getFromCollection("courses", req.query);
    res.status(response.code).json(response.message);
}