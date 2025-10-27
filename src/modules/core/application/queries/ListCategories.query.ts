import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../domain/repositories/Categories.repository";
import { CategoryDTO } from "../dtos/Category.dto";
import { CoreTokens } from "../../tokens";

@injectable()
export class ListCategoriesQuery {
  constructor(@inject(CoreTokens.CategoriesRepository) private readonly categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<CategoryDTO[]> {
    const categories = await this.categoriesRepository.getAll();
    return categories.map((category) => new CategoryDTO(category));
  }
}