import { Movie } from "../Movie"

export interface MoviesRepository {
  getAll(): Promise<Movie[]>
  getById(id: string): Promise<Movie | null>
  create(movie: Movie): Promise<Movie>
  update(movie: Movie): Promise<Movie>
  delete(id: string): Promise<boolean>
}