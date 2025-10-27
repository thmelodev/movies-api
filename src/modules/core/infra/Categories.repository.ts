import { PrismaClient } from "@prisma/client";
import { Category } from "../domain/Category";
import { ICategoriesRepository } from "../domain/repositories/Categories.repository";
import { CategoryMapper } from "./mappers/Category.mapper";
import { inject, injectable } from "tsyringe";
import { SharedTokens } from "../../../shared/container";

@injectable()
export class CategoriesRepository implements ICategoriesRepository {

  constructor(
    @inject(SharedTokens.PrismaClient) private readonly prismaClient: PrismaClient,
    @inject(CategoryMapper) private readonly categoryMapper: CategoryMapper,
  ) {}

  async getAll(): Promise<Category[]> {
    const categories = await this.prismaClient.category.findMany();
    return categories.map((category) => this.categoryMapper.toDomain(category));
  }
}