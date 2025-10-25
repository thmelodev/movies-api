import { Category } from "../Category";

export interface CategoriesRepository {
  getAll(): Promise<Category[]>
}