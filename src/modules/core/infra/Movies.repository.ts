import { Prisma, PrismaClient } from "@prisma/client";
import { Movie } from "../domain/Movie";
import { IMoviesRepository } from "../domain/repositories/Movies.repository";
import { MovieMapper } from "./mappers/Movie.mapper";
import { inject, injectable } from "tsyringe";
import { SharedTokens } from "../../../shared/container";

@injectable()
export class MoviesRepository implements IMoviesRepository {
  constructor(
    @inject(SharedTokens.PrismaClient) private readonly prismaClient: PrismaClient,
    private readonly movieMapper: MovieMapper
  ) { }

  async getAll(): Promise<Movie[]> {
    const moviesModels = await this.prismaClient.movie.findMany({
      include: {
        categories: { select: { id: true } }
      }
    });

    const movies = this.movieMapper.listToDomain(moviesModels);
    return movies;
  }
  async getById(id: string): Promise<Movie | null> {
    const movieModel = await this.prismaClient.movie.findUnique({
      where: { id },
      include: {
        categories: { select: { id: true } }
      }
    });
    if (!movieModel) {
      return null;
    }

    return this.movieMapper.toDomain(movieModel);
  }

  async save(movie: Movie): Promise<Movie> {
    const movieModel = this.movieMapper.toModel(movie);

    const createData: Prisma.MovieCreateInput = {
      ...movieModel,
      language: {
        connect: { id: movieModel.languageId }
      },
      categories: {
        connect: movie.getCategories().map(id => ({ id }))
      }
    }

    const updateData: Prisma.MovieUpdateInput = {
      ...movieModel,
      language: {
        connect: { id: movieModel.languageId }
      },
      categories: {
        set: movie.getCategories().map(id => ({ id }))
      }
    }

    const updatedMovie = await this.prismaClient.movie.upsert({
      where: { id: movie.getId() },
      create: createData,
      update: updateData,
      include: {
        categories: { select: { id: true } },
        language: { select: { id: true } }
      }
    });
    return this.movieMapper.toDomain(updatedMovie);
  }

  async delete(id: string): Promise<void> {
    await this.prismaClient.movie.delete({
      where: { id }
    })
  }
}