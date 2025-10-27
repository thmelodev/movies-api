import { MovieStatus as MovieStatusPrisma } from "@prisma/client";
import { Movie, MovieStatus as MovieStatusDomain } from "../../domain/Movie";
import { MovieModel } from "../models/Movie.model";
import { TypeErrorException } from "../exceptions/TypeError.exception";
import { injectable } from "tsyringe";

@injectable()
export class MovieMapper {
  toDomain(model: MovieModel): Movie {
    return Movie.load({
      id: model.id,
      title: model.title,
      originalTitle: model.originalTitle,
      synopsis: model.synopsis,
      ageRating: model.ageRating,
      releaseDate: model.releaseDate,
      durationMinutes: model.durationMinutes,
      status: this.prismaStatusToDomain(model.status),
      language: model.languageId,
      budget: model.budget,
      revenue: model.revenue,
      imageUrl: model.imageUrl,
      negativeVoteCount: model.negativeVotesCount,
      positiveVoteCount: model.positiveVotesCount,
      categories: model.categories?.map((category) => category.id) || [],
    });
  }

  listToDomain(models: MovieModel[]): Movie[] {
    return models.map((model) => this.toDomain(model));
  }

  toModel(domain: Movie): MovieModel {
    return {
      id: domain.getId(),
      title: domain.getTitle(),
      originalTitle: domain.getOriginalTitle(),
      synopsis: domain.getSynopsis(),
      ageRating: domain.getAgeRating(),
      releaseDate: domain.getReleaseDate(),
      durationMinutes: domain.getDurationMinutes(),
      status: this.domainStatusToPrisma(domain.getStatus()),
      languageId: domain.getLanguage(),
      budget: domain.getBudget(),
      revenue: domain.getRevenue(),
      imageUrl: domain.getImageUrl(),
      negativeVotesCount: domain.getNegativeVotesCount(),
      positiveVotesCount: domain.getPositiveVotesCount(),
      categories: domain.getCategories().map((categoryId) => ({ id: categoryId })),
    }
  }

  listToModel(domains: Movie[]): MovieModel[] {
    return domains.map((domain) => this.toModel(domain));
  }

  private prismaStatusToDomain(s: MovieStatusPrisma): MovieStatusDomain {
    switch (s) {
      case MovieStatusPrisma.RELEASED:
        return MovieStatusDomain.RELEASED;
      case MovieStatusPrisma.UPCOMING:
        return MovieStatusDomain.UPCOMING;
      case MovieStatusPrisma.CANCELLED:
        return MovieStatusDomain.CANCELLED;
      default:
        return this.assertUnreachable(s as never);
    }
  }

  private domainStatusToPrisma(s: MovieStatusDomain): MovieStatusPrisma {
    switch (s) {
      case MovieStatusDomain.RELEASED:
        return MovieStatusPrisma.RELEASED;
      case MovieStatusDomain.UPCOMING:
        return MovieStatusPrisma.UPCOMING;
      case MovieStatusDomain.CANCELLED:
        return MovieStatusPrisma.CANCELLED;
      default:
        return this.assertUnreachable(s as never);
    }
  }

  private assertUnreachable(x: never): never {
    throw new TypeErrorException(`Status inválido: ${x}`);
  }

}