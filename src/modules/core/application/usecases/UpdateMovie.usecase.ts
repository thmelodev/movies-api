import { inject, injectable } from "tsyringe";
import { MovieProps } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/Movies.repository";
import { NotFoundException } from "../exceptions/NotFoundException";
import { CoreTokens } from "../../tokens";

export interface UpdateMovieUsecaseProps extends MovieProps {}

@injectable()
export class UpdateMovieUsecase {
  constructor(@inject(CoreTokens.MoviesRepository) private readonly moviesRepository: IMoviesRepository) {}

  public async execute(props: UpdateMovieUsecaseProps): Promise<void> {
    const movie = await this.moviesRepository.getById(props.id);
    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }
    movie.update(props);
    await this.moviesRepository.save(movie);
  }
}