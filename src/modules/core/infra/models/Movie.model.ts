import { Prisma } from "@prisma/client";

type MovieWithCategoryIds = Prisma.MovieGetPayload<{
  include: { categories: { select: { categoryId: true } } }
}>;

export interface MovieModel extends Omit<MovieWithCategoryIds, "createdAt" | "updatedAt"> {}
