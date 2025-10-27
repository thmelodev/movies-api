import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { ListMoviesQuery } from "../../application/queries/ListMovies.query";
import { CoreTokens } from "../../tokens";
import { GetMovieByIdQuery } from "../../application/queries/GetMovieById.query";
import { CreateMovieUsecase, CreateMovieUsecaseProps } from "../../application/usecases/CreateMovie.usecase";
import { UpdateMovieUsecase, UpdateMovieUsecaseProps } from "../../application/usecases/UpdateMovie.usecase";
import { DeleteMovieUsecase } from "../../application/usecases/DeleteMovie.usecase";

export function registerMoviesRoutes(app: FastifyInstance) {
  const listMoviesQuery = container.resolve<ListMoviesQuery>(CoreTokens.ListMoviesQuery)

  const getMovieByIdQuery = container.resolve<GetMovieByIdQuery>(CoreTokens.GetMovieByIdQuery)

  const createMovieQuery = container.resolve<CreateMovieUsecase>(CoreTokens.CreateMovieUseCase)

  const updateMovieQuery = container.resolve<UpdateMovieUsecase>(CoreTokens.UpdateMovieUsecase)

  const deleteMovieQuery = container.resolve<DeleteMovieUsecase>(CoreTokens.DeleteMovieUsecase)


  app.get("/movies", async (request, reply) => {
    const movies = await listMoviesQuery.execute()
    return reply.send(movies)
  })

  app.get("/movies/:id", async (request, reply) => {
    const { id } = request.params as { id: string }
    const movie = await getMovieByIdQuery.execute(id)
    return reply.send(movie)
  })

  app.post("/movies", async (request, reply) => {
    const movieData = request.body
    const movie = await createMovieQuery.execute(movieData as CreateMovieUsecaseProps)
    return reply.status(201).send(movie)
  })

  app.put("/movies/:id", async (request, reply) => {
    const { id } = request.params as { id: string }
    const movieData = request.body
    const movie = await updateMovieQuery.execute({id, ...movieData as Omit<UpdateMovieUsecaseProps, 'id' >})
    return reply.send(movie)
  })

  app.delete("/movies/:id", async (request, reply) => {
    const { id } = request.params as { id: string }
    await deleteMovieQuery.execute(id)
    return reply.status(204).send()
  })
}