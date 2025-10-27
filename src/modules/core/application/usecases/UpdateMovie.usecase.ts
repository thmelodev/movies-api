import { inject, injectable } from "tsyringe";
import { MovieProps } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/Movies.repository";
import { CoreTokens } from "../../tokens";
import { MovieDTO } from "../dtos/Movies.dto";
import { NotFoundException } from "../exceptions/NotFoundException";

export interface UpdateMovieUsecaseProps extends MovieProps { }

@injectable()
export class UpdateMovieUsecase {
  constructor(
    @inject(CoreTokens.MoviesRepository) private readonly moviesRepository: IMoviesRepository) { }

  public async execute(props: UpdateMovieUsecaseProps): Promise<MovieDTO> {
    const movie = await this.moviesRepository.getById(props.id);
    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }

    movie.update(props);

    const updatedMovie = await this.moviesRepository.save(movie);

    return new MovieDTO(updatedMovie);
  }
}