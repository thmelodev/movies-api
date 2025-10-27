import { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { ListMoviesQuery } from "../../application/queries/ListMovies.query";
import { CoreTokens } from "../../tokens";
import { GetMovieByIdQuery } from "../../application/queries/GetMovieById.query";
import { CreateMovieUsecase, CreateMovieUsecaseProps } from "../../application/usecases/CreateMovie.usecase";
import { UpdateMovieUsecase, UpdateMovieUsecaseProps } from "../../application/usecases/UpdateMovie.usecase";
import { DeleteMovieUsecase } from "../../application/usecases/DeleteMovie.usecase";
import { MovieController } from "../controllers/Movie.controller";

export function registerMoviesRoutes(app: FastifyInstance) {
  const listMoviesQuery = container.resolve<ListMoviesQuery>(CoreTokens.ListMoviesQuery)

  const getMovieByIdQuery = container.resolve<GetMovieByIdQuery>(CoreTokens.GetMovieByIdQuery)

  const createMovieQuery = container.resolve<CreateMovieUsecase>(CoreTokens.CreateMovieUseCase)

  const updateMovieQuery = container.resolve<UpdateMovieUsecase>(CoreTokens.UpdateMovieUsecase)

  const deleteMovieQuery = container.resolve<DeleteMovieUsecase>(CoreTokens.DeleteMovieUsecase)

  const controller = new MovieController(
    listMoviesQuery,
    createMovieQuery,
    deleteMovieQuery,
    updateMovieQuery,
    getMovieByIdQuery
  )


  app.get("/movies", controller.listMovies.bind(controller))

  app.get("/movies/:id", controller.getMovieById.bind(controller))

  app.post("/movies", controller.createMovie.bind(controller))

  app.put("/movies/:id", controller.updateMovie.bind(controller))

  app.delete("/movies/:id", controller.deleteMovie.bind(controller))
}