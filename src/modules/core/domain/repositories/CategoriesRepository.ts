import { Category } from "../Category";

export interface ICategoriesRepository {
  getAll(): Promise<Category[]>
}