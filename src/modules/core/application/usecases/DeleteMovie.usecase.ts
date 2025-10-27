import { inject, injectable } from "tsyringe";
import { IMoviesRepository } from "../../domain/repositories/Movies.repository";
import { CoreTokens } from "../../tokens";
import { NotFoundException } from "../exceptions/NotFoundException";

@injectable()
export class DeleteMovieUsecase {
  constructor(@inject(CoreTokens.MoviesRepository) private readonly moviesRepository: IMoviesRepository) {}

  async execute(id: string): Promise<void> {
    const movie = await this.moviesRepository.getById(id);
    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }
    await this.moviesRepository.delete(movie.getId());
  }
}