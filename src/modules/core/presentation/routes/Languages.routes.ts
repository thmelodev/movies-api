import { FastifyInstance } from "fastify";
import { ListLanguagesQuery } from "../../application/queries/ListLanguages.query";
import { CoreTokens } from "../../tokens";
import { container } from "tsyringe";
import { LanguageController } from "../controllers/Language.controller";

export function registerLanguagesRoutes(app: FastifyInstance) {
  const listLanguagesQuery = container.resolve<ListLanguagesQuery>(CoreTokens.ListLanguagesQuery)

  const languageController = new LanguageController(listLanguagesQuery)

  app.get("/languages", languageController.listLanguages.bind(languageController))
}