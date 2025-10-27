import { Category } from "../Category";

export interface ICategoriesRepository {
  getAll(): Promise<Category[]>
  getByIds(ids: string[]): Promise<Category[] | null>
}