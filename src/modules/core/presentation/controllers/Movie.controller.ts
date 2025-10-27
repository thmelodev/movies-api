import { FastifyReply, FastifyRequest } from "fastify";
import { inject } from "tsyringe";
import z from "zod";
import { GetMovieByIdQuery } from "../../application/queries/GetMovieById.query";
import { ListMoviesQuery } from "../../application/queries/ListMovies.query";
import { CreateMovieUsecase, CreateMovieUsecaseProps } from "../../application/usecases/CreateMovie.usecase";
import { DeleteMovieUsecase } from "../../application/usecases/DeleteMovie.usecase";
import { UpdateMovieUsecase, UpdateMovieUsecaseProps } from "../../application/usecases/UpdateMovie.usecase";
import { InvalidPropsException } from "../../domain/exceptions/InvalidPropsException";
import { CoreTokens } from "../../tokens";
import { MovieDTO } from "../dtos/movie.dto";

export class MovieController {
  constructor(
    @inject(CoreTokens.ListMoviesQuery)
    private readonly listMoviesQuery: ListMoviesQuery,
    @inject(CoreTokens.CreateMovieUseCase)
    private readonly createMovieUseCase: CreateMovieUsecase,
    @inject(CoreTokens.DeleteMovieUsecase)
    private readonly deleteMovieUsecase: DeleteMovieUsecase,
    @inject(CoreTokens.UpdateMovieUsecase)
    private readonly updateMovieUsecase: UpdateMovieUsecase,
    @inject(CoreTokens.GetMovieByIdQuery)
    private readonly getMovieByIdQuery: GetMovieByIdQuery
  ) { }

  public async listMovies(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const movies = await this.listMoviesQuery.execute();
    return reply.status(200).send(movies);
  }

  public async createMovie(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const parseResult = MovieDTO.safeParse(req.body);

    if (!parseResult.success) {
      console.log(`Zod Error: ${JSON.parse(parseResult.error.message)[0]?.message}`);
      return reply.status(400).send(new InvalidPropsException("Parâmetros inválidos"));
    }

    const movie = await this.createMovieUseCase.execute(
      {
        ...parseResult.data,
        status: parseResult.data.status as CreateMovieUsecaseProps['status']
      });
    return reply.status(201).send(movie);
  }

  public async deleteMovie(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const paramsValidation = z.object({
      id: z.uuid(),
    }).safeParse(req.params);

    if (!paramsValidation.success) {
      console.log(`Zod Error: ${JSON.parse(paramsValidation.error.message)[0]?.message}`);
      return reply.status(400).send(new InvalidPropsException("Parâmetros inválidos"));
    }

    await this.deleteMovieUsecase.execute(paramsValidation.data.id);
    return reply.status(204).send();
  }

  public async updateMovie(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {

    const paramsValidation = z.object({
      id: z.uuid(),
    }).safeParse(req.params);

    if (!paramsValidation.success) {
      console.log(paramsValidation)
      console.log(`Zod Error: ${JSON.parse(paramsValidation.error.message)[0]?.message}`);
      return reply.status(400).send(new InvalidPropsException("Parâmetros inválidos"));
    }

    const parseResult = MovieDTO.safeParse(req.body);

    if (!parseResult.success) {
      console.log(parseResult)
      console.log(`Zod Error: ${JSON.parse(parseResult.error.message)[0]?.message}`);
      return reply.status(400).send(new InvalidPropsException("Parâmetros inválidos"));
    }

    const movie = await this.updateMovieUsecase.execute(
      {
        id: paramsValidation.data.id,
        ...parseResult.data,
        status: parseResult.data.status as UpdateMovieUsecaseProps['status']
      }
    );
    return reply.status(200).send(movie);
  }

  public async getMovieById(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const paramsValidation = z.object({
      id: z.uuid(),
    }).safeParse(req.params);

    if (!paramsValidation.success) {
      console.log(`Zod Error: ${JSON.parse(paramsValidation.error.message)[0]?.message}`);
      return reply.status(400).send(new InvalidPropsException("Parâmetros inválidos"));
    }

    const movie = await this.getMovieByIdQuery.execute(paramsValidation.data.id);
    return reply.status(200).send(movie);
  }
}