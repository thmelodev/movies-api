import { Prisma, PrismaClient } from "@prisma/client";
import { Movie } from "../domain/Movie";
import { IMoviesRepository } from "../domain/repositories/Movies.repository";
import { MovieMapper } from "./mappers/Movie.mapper";
import { inject, injectable } from "tsyringe";
import { SharedTokens } from "../../../shared/tokens";
import { CoreTokens } from "../tokens";
import { RepositoryException } from "./exceptions/Repository.exception";

@injectable()
export class MoviesRepository implements IMoviesRepository {
  constructor(
    @inject(SharedTokens.PrismaClient) private readonly prismaClient: PrismaClient,
    @inject(CoreTokens.MovieMapper) private readonly movieMapper: MovieMapper
  ) { }

  async getAll(): Promise<Movie[]> {
    try {
      const moviesModels = await this.prismaClient.movie.findMany({
        include: {
          categories: { select: { categoryId: true } }
        }
      });

      const movies = this.movieMapper.listToDomain(moviesModels);
      return movies;
    } catch (error) {
      console.log(`RepositoryException: ${(error as Error).message}`);
      throw new RepositoryException('Erro ao buscar filmes.');
    }
  }
  async getById(id: string): Promise<Movie | null> {
    try {
      const movieModel = await this.prismaClient.movie.findUnique({
        where: { id },
        include: {
          categories: { select: { categoryId: true } }
        }
      });
      if (!movieModel) {
        return null;
      }

      return this.movieMapper.toDomain(movieModel);
    } catch (error) {
      console.log(`RepositoryException: ${(error as Error).message}`);
      throw new RepositoryException('Erro ao buscar filme por ID.');
    }
  }

  async save(movie: Movie): Promise<Movie> {
    try {
      const movieModel = this.movieMapper.toModel(movie);

      const movieData = { ...movieModel, languageId: undefined };

      const createData: Prisma.MovieCreateInput = {
        ...movieData,
        language: {
          connect: { id: movieModel.languageId }
        },
        categories: {
          create: movie.getCategories().map((categoryId) => ({
            category: { connect: { id: categoryId } }
          }))
        }
      }

      const updateData: Prisma.MovieUpdateInput = {
        ...movieData,
        language: {
          connect: { id: movieModel.languageId }
        },
        categories: {
          deleteMany: {},
          create: movie.getCategories().map((categoryId) => ({
            category: { connect: { id: categoryId } }
          }))
        }
      }

      const updatedMovie = await this.prismaClient.$transaction(async (tx) => {
        await tx.movie.upsert({
          where: { id: movie.getId() },
          create: createData,
          update: updateData,
          include: {
            categories: { select: { categoryId: true } },
            language: { select: { id: true } }
          }
        });

        await tx.movieCategory.deleteMany({ where: { movieId: movieModel.id } })

        if (movie.getCategories().length > 0) {
          await tx.movieCategory.createMany({
            data: movie.getCategories().map((categoryId) => ({
              movieId: movieModel.id,
              categoryId,
            })),
            skipDuplicates: true,
          });
        }

        const reloaded = await tx.movie.findUnique({
          where: { id: movieModel.id },
          include: {
            categories: { select: { categoryId: true } },
            language: { select: { id: true } },
          },
        });

        return reloaded!;
      })

      return this.movieMapper.toDomain(updatedMovie);

    } catch (error) {
      console.log(`RepositoryException: ${(error as Error).message}`);
      throw new RepositoryException('Erro ao salvar filme.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.prismaClient.movie.delete({
        where: { id }
      })
    } catch (error) {
      console.log(`RepositoryException: ${(error as Error).message}`);
      throw new RepositoryException('Erro ao deletar filme.');
    }
  }
}