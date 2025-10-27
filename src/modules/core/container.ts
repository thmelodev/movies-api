import { container } from 'tsyringe';
import { ListCategoriesQuery } from './application/queries/ListCategories.query';
import { CategoriesRepository } from './infra/Categories.repository';
import { LanguagesRepository } from './infra/Languages.repository';
import { CategoryMapper } from './infra/mappers/Category.mapper';
import { LanguageMapper } from './infra/mappers/Language.mapper';
import { MovieMapper } from './infra/mappers/Movie.mapper';
import { MoviesRepository } from './infra/Movies.repository';
import { CoreTokens } from './tokens';

export function registerCoreModule(containerInstance = container) {
  // mappers
  containerInstance.registerSingleton<CategoryMapper>(CategoryMapper);
  containerInstance.registerSingleton<LanguageMapper>(LanguageMapper);
  containerInstance.registerSingleton<MovieMapper>(MovieMapper);

  // repositories
  containerInstance.registerSingleton(CoreTokens.CategoriesRepository, CategoriesRepository)
  containerInstance.registerSingleton(CoreTokens.LanguagesRepository, LanguagesRepository)
  containerInstance.registerSingleton(CoreTokens.MoviesRepository, MoviesRepository)

  // queries
  containerInstance.registerSingleton(CoreTokens.ListCategoriesQuery, ListCategoriesQuery)
}




