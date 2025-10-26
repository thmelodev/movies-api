import { Prisma } from "@prisma/client";

type MovieWithCategoryIds = Prisma.MovieGetPayload<{
  include: { categories: { select: { id: true } } }
}>;

export interface MovieModel extends Omit<MovieWithCategoryIds, "createdAt" | "updatedAt"> {}