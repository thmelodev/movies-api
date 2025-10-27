import { Movie } from "../Movie"

export interface IMoviesRepository {
  getAll(): Promise<Movie[]>
  getById(id: string): Promise<Movie | null>
  save(movie: Movie): Promise<Movie>
  delete(id: string): Promise<void>
}