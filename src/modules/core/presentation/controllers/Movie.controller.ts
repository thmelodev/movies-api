import { inject } from "tsyringe";
import { CoreTokens } from "../../tokens";
import { ListMoviesQuery } from "../../application/queries/ListMovies.query";
import { CreateMovieUsecase, CreateMovieUsecaseProps } from "../../application/usecases/CreateMovie.usecase";
import { DeleteMovieUsecase } from "../../application/usecases/DeleteMovie.usecase";
import { UpdateMovieUsecase, UpdateMovieUsecaseProps } from "../../application/usecases/UpdateMovie.usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { GetMovieByIdQuery } from "../../application/queries/GetMovieById.query";

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
  ) {}

  public async listMovies(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const movies = await this.listMoviesQuery.execute();
    return reply.status(200).send(movies);
  }

  public async createMovie(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const movie = await this.createMovieUseCase.execute(req.body as CreateMovieUsecaseProps);
    return reply.status(201).send(movie);
  }

  public async deleteMovie(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params as { id: string };
    await this.deleteMovieUsecase.execute(id);
    return reply.status(204).send();
  }

  public async updateMovie(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params as { id: string };
    const movie = await this.updateMovieUsecase.execute({id, ...req.body as Omit<UpdateMovieUsecaseProps, 'id'>});
    return reply.status(200).send(movie);
  }

  public async getMovieById(req: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    const { id } = req.params as { id: string };
    const movie = await this.getMovieByIdQuery.execute(id);
    return reply.status(200).send(movie);
  }
}