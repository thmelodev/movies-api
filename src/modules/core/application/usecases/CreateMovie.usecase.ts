import { inject } from "tsyringe";
import { Movie, MovieProps } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/Movies.repository";
import { MovieDTO } from "../dtos/Movies.dto";
import { CoreTokens } from "../../tokens";

export interface CreateMovieUsecaseProps extends Omit<MovieProps, 'id'> {}

export class CreateMovieUsecase {
  constructor(@inject(CoreTokens.MoviesRepository) private readonly moviesRepository: IMoviesRepository) {}

  public async execute(props: CreateMovieUsecaseProps): Promise<MovieDTO> {
    const movie = Movie.create(props);
    await this.moviesRepository.save(movie);
    return new MovieDTO(movie);
  }

  
}