import { z } from 'zod';

const errors = {
  title: 'Title cannot be empty.',
  description: 'Description cannot be empty.',
  image: 'Image must be a valid url.',
};

// with zod you can extract a Typescript interface
// post request is expecting type TravelLog
// this code can run server-side and client-side

export const TravelLog = z.object({
  title: z.string().trim().min(1, errors.title),
  description: z.string().min(1, errors.description),
  image: z.string().url(errors.image),
  rating: z.coerce.number().min(0).max(10).default(0),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
  visitDate: z.coerce.date(),
}); // validator for zod

// TravelLogProperties is now an enum : z.ZodEnum<["title","description",....]>
export const TravelLogProperties = TravelLog.keyof().Enum;

// extracting the Types from TravelLogProperties to one object = "title" | "description" | "image" | etc
export type TravelLogProperty = keyof typeof TravelLogProperties;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TravelLog = z.infer<typeof TravelLog>;

// export type TravelLog = z.infer<typeof TravelLog>;
// export type TravelLogWithId = WithId<TravelLog>;
// export const TravelLogs = db.collection<TravelLog>('logs');

// exporting the validator -> model TravelLog
// exporting interface -> type TravelLog
// exporting database collectionx -> TravelLogs = dbCollection
