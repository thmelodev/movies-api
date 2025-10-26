import { CategoryModel } from "../models/Category.model";
import { Category } from "../../domain/Category";

export class CategoryMapper {
  toDomain(model: CategoryModel): Category {
    return Category.load({
      id: model.id,
      name: model.name,
    })
  }

  listToDomain(models: CategoryModel[]): Category[] {
    return models.map((model) => this.toDomain(model));
  }

  toModel(domain: Category): CategoryModel {
    return {
      id: domain.getId(),
      name: domain.getName(),
    }
  }

  listToModel(domains: Category[]): CategoryModel[] {
    return domains.map((domain) => this.toModel(domain));
  }
}