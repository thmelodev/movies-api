import { MovieProps } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/MoviesRepository";
import { NotFoundException } from "../exceptions/NotFoundException";

export interface UpdateMovieUsecaseProps extends MovieProps {}

export class UpdateMovieUsecase {
  constructor(private readonly moviesRepository: IMoviesRepository) {}

  public async execute(props: UpdateMovieUsecaseProps): Promise<void> {
    const movie = await this.moviesRepository.getById(props.id);
    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }
    movie.update(props);
    await this.moviesRepository.save(movie);
  }
}