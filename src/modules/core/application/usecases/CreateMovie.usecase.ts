import { Movie, MovieProps } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/MoviesRepository";
import { MovieDTO } from "../dtos/Movies.dto";
import { NotFoundException } from "../exceptions/NotFoundException";

export interface CreateMovieUsecaseProps extends Omit<MovieProps, 'id'> {}

export class CreateMovieUsecase {
  constructor(private readonly moviesRepository: IMoviesRepository) {}

  public async execute(props: CreateMovieUsecaseProps): Promise<MovieDTO> {
    const movie = Movie.create(props);
    await this.moviesRepository.create(movie);
    return new MovieDTO(movie);
  }

  
}