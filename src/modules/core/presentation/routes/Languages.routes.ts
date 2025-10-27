import { FastifyInstance } from "fastify";
import { ListLanguagesQuery } from "../../application/queries/ListLanguages.query";
import { CoreTokens } from "../../tokens";
import { container } from "tsyringe";

export function registerLanguagesRoutes(app: FastifyInstance) {
  const listLanguagesQuery = container.resolve<ListLanguagesQuery>(CoreTokens.ListLanguagesQuery)

  app.get("/languages", async (request, reply) => {
    const languages = await listLanguagesQuery.execute();
    return reply.send(languages);
  })
}