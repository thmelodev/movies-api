import { inject } from "tsyringe";
import { CoreTokens } from "../../tokens";
import { ListLanguagesQuery } from "../../application/queries/ListLanguages.query";
import { FastifyReply, FastifyRequest } from "fastify";

export class LanguageController {
  constructor(
    @inject(CoreTokens.ListLanguagesQuery)
    private readonly listLanguagesQuery: ListLanguagesQuery
  ){}

  public async listLanguages(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const languages = await this.listLanguagesQuery.execute();
    return reply.status(200).send(languages);
  }
}