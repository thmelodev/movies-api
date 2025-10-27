import { PrismaClient } from "@prisma/client";
import { ILanguagesRepository } from "../domain/repositories/Languages.repository";
import { Language } from "../domain/Language";
import { LanguageMapper } from "./mappers/Language.mapper";
import { inject, injectable } from "tsyringe";
import { SharedTokens } from "../../../shared/container";


@injectable()
export class LanguagesRepository implements ILanguagesRepository {
  constructor(
    @inject(SharedTokens.PrismaClient) private readonly prismaClient: PrismaClient,
    private readonly languageMapper: LanguageMapper,
  ) {}

  async getAll(): Promise<Language[]> {
    const languages = await this.prismaClient.language.findMany();
    return languages.map((language) => this.languageMapper.toDomain(language));
  }
}