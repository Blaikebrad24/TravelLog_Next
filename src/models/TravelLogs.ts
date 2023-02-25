import db from '@/db';
import { WithId } from 'mongodb';

// with zod you can extract a Typescript interface
// post request is expecting type TravelLog

import { TravelLog } from './TravelLog/TravelLog'; // validator for zod

export { TravelLog };
// eslint-disable-next-line @typescript-eslint/no-redeclare

export type TravelLogWithId = WithId<TravelLog>; // adds _id with type TravelLog
export const TravelLogs = db.collection<TravelLog>('logs');

// exporting the validator -> model TravelLog
// exporting interface -> type TravelLog
// exporting database collectionx -> TravelLogs = dbCollection
