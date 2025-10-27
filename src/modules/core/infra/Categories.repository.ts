import { PrismaClient } from "@prisma/client";
import { Category } from "../domain/Category";
import { ICategoriesRepository } from "../domain/repositories/Categories.repository";
import { CategoryMapper } from "./mappers/Category.mapper";
import { inject, injectable } from "tsyringe";
import { SharedTokens } from "../../../shared/tokens";
import { RepositoryException } from "./exceptions/Repository.exception";
import { CoreTokens } from "../tokens";

@injectable()
export class CategoriesRepository implements ICategoriesRepository {

  constructor(
    @inject(SharedTokens.PrismaClient) private readonly prismaClient: PrismaClient,
    @inject(CoreTokens.CategoryMapper) private readonly categoryMapper: CategoryMapper,
  ) { }

  async getAll(): Promise<Category[]> {
    try {
      const categories = await this.prismaClient.category.findMany();
      return categories.map((category) => this.categoryMapper.toDomain(category));
    } catch (err) {
      console.log(err);
      throw new RepositoryException('Erro ao buscar categorias');
    }
  }

  async getByIds(ids: string[]): Promise<Category[]> {
    try {
      const categories = await this.prismaClient.category.findMany({
        where: {
          id: {
            in: ids,
          },
        },
      });
      return this.categoryMapper.listToDomain(categories);
    } catch (err) {
      console.log(err);
      throw new RepositoryException('Erro ao buscar categorias por IDs');
    }
  }
}