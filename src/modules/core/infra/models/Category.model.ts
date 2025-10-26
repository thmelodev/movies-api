import { Category } from "@prisma/client";

export interface CategoryModel extends Omit<Category, "createdAt" | "updatedAt"> {}