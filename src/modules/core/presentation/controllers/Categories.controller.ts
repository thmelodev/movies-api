import { FastifyReply, FastifyRequest } from "fastify";
import { ListCategoriesQuery } from "../../application/queries/ListCategories.query";

export class CategoriesController {
  constructor(private readonly listCategoriesQuery: ListCategoriesQuery) {}

  public async listCategories(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const categories = await this.listCategoriesQuery.execute();
    return reply.status(200).send(categories);
  }
}