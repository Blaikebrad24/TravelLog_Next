import db from '@/db';
import { WithId } from 'mongodb';
import { z } from 'zod';

// with zod you can extract a Typescript interface
// post request is expecting type TravelLog

export const TravelLog = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().url(),
  rating: z.number().min(0).max(10).default(0),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  visitDate: z.date(),
}); // validator for zod

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLog = z.infer<typeof TravelLog>;
export type TravelLogWithId = WithId<TravelLog>;
export const TravelLogs = db.collection<TravelLog>('logs');

// exporting the validator -> model TravelLog
// exporting interface -> type TravelLog
// exporting database collectionx -> TravelLogs = dbCollection
