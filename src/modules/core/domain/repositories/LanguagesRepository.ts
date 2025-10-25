import { Language } from "../Language";

export interface ILanguagesRepository {
  getAll(): Promise<Language[]>
}