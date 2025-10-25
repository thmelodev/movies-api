import { Language } from "../../domain/Language";
import { ILanguagesRepository } from "../../domain/repositories/LanguagesRepository";
import { LanguageDTO } from "../dtos/Language.dto";

export class ListLanguagesQuery {
  constructor(private readonly languagesRepository: ILanguagesRepository) {}

  public async execute(): Promise<LanguageDTO[]> {
    const languages = await this.languagesRepository.getAll();
    return languages.map((language) => this.toDTO(language));
  } 

  private toDTO(language: Language): LanguageDTO {
    return {
      id: language.getId(),
      name: language.getName(),
    };
  }
}