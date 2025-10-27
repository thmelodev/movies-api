import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { ListCategoriesQuery } from "../../application/queries/ListCategories.query";
import { CategoriesController } from "../controllers/Categories.controller";
import { CoreTokens } from "../../tokens";

export function registerCategoriesRoutes(app: FastifyInstance) {
  const listCategoriasQuery = container.resolve<ListCategoriesQuery>(CoreTokens.ListCategoriesQuery)
  const controller = new CategoriesController(listCategoriasQuery);

  app.get("/categories", controller.listCategories.bind(controller));
}