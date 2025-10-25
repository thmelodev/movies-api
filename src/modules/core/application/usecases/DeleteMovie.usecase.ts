import { IMoviesRepository } from "../../domain/repositories/MoviesRepository";
import { NotFoundException } from "../exceptions/NotFoundException";

export class DeleteMovieUsecase {
  constructor(private readonly moviesRepository: IMoviesRepository) {}

  async execute(id: string): Promise<void> {
    const movie = await this.moviesRepository.getById(id);
    if (!movie) {
      throw new NotFoundException('Filme não encontrado');
    }
    await this.moviesRepository.delete(movie.getId());
  }
}