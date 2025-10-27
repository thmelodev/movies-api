import { Language } from "../Language";

export interface ILanguagesRepository {
  getAll(): Promise<Language[]>
  getById(id: string): Promise<Language | null>
}