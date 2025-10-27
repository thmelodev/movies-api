import { inject, injectable } from "tsyringe";
import { Movie, MovieProps } from "../../domain/Movie";
import { IMoviesRepository } from "../../domain/repositories/Movies.repository";
import { MovieDTO } from "../dtos/Movies.dto";
import { CoreTokens } from "../../tokens";
import { NotFoundException } from "../exceptions/NotFoundException";
import { ICategoriesRepository } from "../../domain/repositories/Categories.repository";
import { ILanguagesRepository } from "../../domain/repositories/Languages.repository";

export interface CreateMovieUsecaseProps extends Omit<MovieProps, 'id'> {}

@injectable()
export class CreateMovieUsecase {
  constructor(
    @inject(CoreTokens.MoviesRepository) private readonly moviesRepository: IMoviesRepository,
    @inject(CoreTokens.LanguagesRepository) private readonly languagesRepository: ILanguagesRepository,
    @inject(CoreTokens.CategoriesRepository) private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(props: CreateMovieUsecaseProps): Promise<MovieDTO> {
    // get language
    const language = await this.languagesRepository.getById(props.language);
    if (!language) {
      throw new NotFoundException('Idioma não encontrado');
    }

    const categoriesIds = Array.from(new Set(props.categories));

    const categories = await this.categoriesRepository.getByIds(categoriesIds);
    if (!categories || categories.length !== categoriesIds.length) {
      throw new NotFoundException('Algumas categorias não foram encontradas');
    }

    const movie = Movie.create({
      ...props,
      categories: categoriesIds,
    });
    await this.moviesRepository.save(movie);
    return new MovieDTO(movie);
  }
}