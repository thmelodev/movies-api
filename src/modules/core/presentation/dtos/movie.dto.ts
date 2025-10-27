import { MovieStatus } from '@prisma/client';
import { z } from 'zod';

const MovieStatusSchema = z.enum(MovieStatus);

const DateFromInput = z.preprocess((val) => {
  if (val instanceof Date) return val;
  if (typeof val === 'string' || typeof val === 'number') {
    const d = new Date(val);
    return isNaN(d.getTime()) ? val : d;
  }
  return val;
}, z.date());


export const MovieDTO = z.object({
  title: z.string().min(1).max(255),
  originalTitle: z.string().min(1).max(255),
  synopsis: z.string().min(1).max(2000),
  ageRating: z.coerce.number().int().min(0).max(21),
  releaseDate: DateFromInput,
  durationMinutes: z.coerce.number().int().positive(),
  status: MovieStatusSchema,
  language: z.uuid(),
  budget: z.coerce.number(),
  revenue: z.coerce.number().nonnegative(),
  imageUrl: z.url(),
  negativeVoteCount: z.coerce.number().int().nonnegative().default(0),
  positiveVoteCount: z.coerce.number().int().nonnegative().default(0),
  categories: z.array(z.uuid()).default([]),
});
