// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { TravelLogs, TravelLogWithId, TravelLog } from '@/models/TravelLogs';
import { WithId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    TravelLogWithId | TravelLogWithId[] | { message: string }
  >
) {
  try {
    switch (req.method) {
      case 'POST': {
        const validatedLog = await TravelLog.parseAsync(req.body); // using Zod to validate request body
        const insertedResult = await TravelLogs.insertOne(validatedLog); // adheres to the schema here
        return res.status(200).json({
          ...req.body,
          _id: insertedResult.insertedId,
        });
      }
      case 'GET': {
        const logs = await TravelLogs.find().toArray();
        return res.status(200).json(logs);
      }
      default: {
        return res.status(405).json({ message: 'Not Supported' });
      }
    }
  } catch (e) {
    // server error
    const error = e as unknown as Error;
    return res.status(500).json({
      message: error.message,
    });
  }
}
