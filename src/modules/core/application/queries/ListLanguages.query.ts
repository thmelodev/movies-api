import { inject } from "tsyringe";
import { ILanguagesRepository } from "../../domain/repositories/Languages.repository";
import { CoreTokens } from "../../tokens";
import { LanguageDTO } from "../dtos/Language.dto";

export class ListLanguagesQuery {
  constructor(@inject(CoreTokens.LanguagesRepository) private readonly languagesRepository: ILanguagesRepository) {}

  public async execute(): Promise<LanguageDTO[]> {
    const languages = await this.languagesRepository.getAll();
    return languages.map((language) => new LanguageDTO(language));
  } 

}