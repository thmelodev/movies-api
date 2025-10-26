import { Language } from "../../domain/Language";
import { LanguageModel } from "../models/Language.model";

export class LanguageMapper {
  toDomain(model: LanguageModel): Language {
    return Language.create({
      id: model.id,
      name: model.name,
    })
  }

  listToDomain(models: LanguageModel[]): Language[] {
    return models.map((model) => this.toDomain(model));
  }

  toModel(domain: Language): LanguageModel {
    return {
      id: domain.getId(),
      name: domain.getName(),
    }
  }

  listToModel(domains: Language[]): LanguageModel[] {
    return domains.map((domain) => this.toModel(domain));
  }
}