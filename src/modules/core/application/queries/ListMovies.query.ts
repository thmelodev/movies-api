import { Movie } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/MoviesRepository";
import { MovieDTO } from "../dtos/Movies.dto";

export class ListMoviesQuery {
  constructor(private readonly moviesRepository: IMoviesRepository) {}

  public async execute(): Promise<MovieDTO[]> {
    const movies = await this.moviesRepository.getAll();
    return movies.map((movie) => new MovieDTO(movie));
  }
}