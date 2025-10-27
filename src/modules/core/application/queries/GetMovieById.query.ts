import { inject, injectable } from "tsyringe";
import { MoviesRepository } from "../../infra/Movies.repository";
import { CoreTokens } from "../../tokens";
import { MovieDTO } from "../dtos/Movies.dto";
import { NotFoundException } from "../exceptions/NotFoundException";

@injectable()
export class GetMovieByIdQuery {
  constructor(@inject(CoreTokens.MoviesRepository) private readonly moviesRepository: MoviesRepository) {}

  public async execute(id: string): Promise<MovieDTO> {
    const movie = await this.moviesRepository.getById(id);
    if (!movie) {
      throw new NotFoundException("Filme não encontrado");
    }
    return new MovieDTO(movie);
  }
}