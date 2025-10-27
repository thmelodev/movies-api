import { PrismaClient } from "@prisma/client";
import { ILanguagesRepository } from "../domain/repositories/Languages.repository";
import { Language } from "../domain/Language";
import { LanguageMapper } from "./mappers/Language.mapper";
import { inject, injectable } from "tsyringe";
import { SharedTokens } from "../../../shared/container";
import { RepositoryException } from "./exceptions/Repository.exception";
import { CoreTokens } from "../tokens";


@injectable()
export class LanguagesRepository implements ILanguagesRepository {
  constructor(
    @inject(SharedTokens.PrismaClient) private readonly prismaClient: PrismaClient,
    @inject(CoreTokens.LanguageMapper) private readonly languageMapper: LanguageMapper,
  ) { }

  async getAll(): Promise<Language[]> {
    try {
      const languages = await this.prismaClient.language.findMany();
      return languages.map((language) => this.languageMapper.toDomain(language));
    } catch (err) {
      console.log(err);
      throw new RepositoryException('Erro ao buscar idiomas');
    }
  }

  async getById(id: string): Promise<Language | null> {

    try {
      const language = await this.prismaClient.language.findUnique({
        where: { id },
      })
      if (!language) {
        return null;
      }

      return this.languageMapper.toDomain(language);
    } catch (err) {
      console.log(err);
      throw new RepositoryException('Erro ao buscar idioma por ID');
    }
  }
}