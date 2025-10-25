import { Language } from "../Language";

export interface LanguagesRepository {
  getAll(): Promise<Language[]>
}