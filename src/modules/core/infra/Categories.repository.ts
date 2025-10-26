import { PrismaClient } from "@prisma/client";
import { Category } from "../domain/Category";
import { ICategoriesRepository } from "../domain/repositories/Categories.repository";
import { CategoryMapper } from "./mappers/Category.mapper";

export class CategoriesRepository implements ICategoriesRepository {

  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly categoryMapper: CategoryMapper,
  ) {}

  async getAll(): Promise<Category[]> {
    const categories = await this.prismaClient.category.findMany();
    return categories.map((category) => this.categoryMapper.toDomain(category));
  }
}