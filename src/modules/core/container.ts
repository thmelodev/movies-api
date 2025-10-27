import { container } from 'tsyringe';
import { ListCategoriesQuery } from './application/queries/ListCategories.query';
import { CategoriesRepository } from './infra/Categories.repository';
import { LanguagesRepository } from './infra/Languages.repository';
import { CategoryMapper } from './infra/mappers/Category.mapper';
import { LanguageMapper } from './infra/mappers/Language.mapper';
import { MovieMapper } from './infra/mappers/Movie.mapper';
import { MoviesRepository } from './infra/Movies.repository';
import { CoreTokens } from './tokens';
import { ListLanguagesQuery } from './application/queries/ListLanguages.query';
import { ListMoviesQuery } from './application/queries/ListMovies.query';
import { GetMovieByIdQuery } from './application/queries/GetMovieById.query';
import { CreateMovieUsecase } from './application/usecases/CreateMovie.usecase';
import { UpdateMovieUsecase } from './application/usecases/UpdateMovie.usecase';
import { DeleteMovieUsecase } from './application/usecases/DeleteMovie.usecase';
import { ICategoriesRepository } from './domain/repositories/Categories.repository';
import { ILanguagesRepository } from './domain/repositories/Languages.repository';
import { IMoviesRepository } from './domain/repositories/Movies.repository';

export function registerCoreModule(containerInstance = container) {
  // mappers
  containerInstance.registerSingleton<CategoryMapper>(CoreTokens.CategoryMapper,CategoryMapper);
  containerInstance.registerSingleton<LanguageMapper>(CoreTokens.LanguageMapper,LanguageMapper);
  containerInstance.registerSingleton<MovieMapper>(CoreTokens.MovieMapper,MovieMapper);

  // repositories
  containerInstance.registerSingleton<ICategoriesRepository>(CoreTokens.CategoriesRepository, CategoriesRepository)
  containerInstance.registerSingleton<ILanguagesRepository>(CoreTokens.LanguagesRepository, LanguagesRepository)
  containerInstance.registerSingleton<IMoviesRepository>(CoreTokens.MoviesRepository, MoviesRepository)

  // queries
  containerInstance.registerSingleton<ListCategoriesQuery>(CoreTokens.ListCategoriesQuery, ListCategoriesQuery)
  containerInstance.registerSingleton<ListLanguagesQuery>(CoreTokens.ListLanguagesQuery, ListLanguagesQuery)
  containerInstance.registerSingleton<ListMoviesQuery>(CoreTokens.ListMoviesQuery, ListMoviesQuery)
  containerInstance.registerSingleton<GetMovieByIdQuery>(CoreTokens.GetMovieByIdQuery, GetMovieByIdQuery)

  // usecases
  containerInstance.registerSingleton<CreateMovieUsecase>(CoreTokens.CreateMovieUseCase, CreateMovieUsecase)
  containerInstance.registerSingleton<UpdateMovieUsecase>(CoreTokens.UpdateMovieUsecase, UpdateMovieUsecase)
  containerInstance.registerSingleton<DeleteMovieUsecase>(CoreTokens.DeleteMovieUsecase, DeleteMovieUsecase)
}




