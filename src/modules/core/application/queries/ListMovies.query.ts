import { inject, injectable } from "tsyringe";
import { Movie } from "../../domain/Movie";
import { MovieDTO } from "../dtos/Movies.dto";
import { CoreTokens } from "../../tokens";
import { IMoviesRepository } from "../../domain/repositories/Movies.repository";

@injectable()
export class ListMoviesQuery {
  constructor(@inject(CoreTokens.MoviesRepository) private readonly moviesRepository: IMoviesRepository) {}

  public async execute(): Promise<MovieDTO[]> {
    const movies = await this.moviesRepository.getAll();
    return movies.map((movie) => new MovieDTO(movie));
  }
}