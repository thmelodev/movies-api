import { Category } from "../../domain/Category";
import { ICategoriesRepository } from "../../domain/repositories/CategoriesRepository";
import { CategoryDTO } from "../dtos/Category.dto";

export class ListCategoriesQuery {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<CategoryDTO[]> {
    const categories = await this.categoriesRepository.getAll();
    return categories.map((category) => this.toDTO(category));
  }

  private toDTO(category: Category): CategoryDTO {
    return {
      id: category.getId(),
      name: category.getName(),
    };
  }
}