import { Movie } from "../Movie"

export interface IMoviesRepository {
  getAll(): Promise<Movie[]>
  getById(id: string): Promise<Movie>
  create(movie: Movie): Promise<Movie>
  save(movie: Movie): Promise<Movie>
  delete(id: string): Promise<boolean>
}