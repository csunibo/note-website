import { notion } from "../../notion"
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
  
    const { database_id } = req.query;
    res.status(200).json({ database_id })
  }