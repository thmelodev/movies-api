import { Movie, MovieStatus } from "../../domain/Movie"

const MovieStatusPT: Record<MovieStatus, string> = {
  [MovieStatus.RELEASED]: 'Lançado',
  [MovieStatus.UPCOMING]: 'Próximo lançamento',
  [MovieStatus.CANCELLED]: 'Cancelado',
};

export class MovieDTO {
  id: string
  title: string
  originalTitle: string
  synopsis: string
  ageRating: number
  releaseDate: Date
  duration: string
  status: string
  language: string
  budget: string
  revenue: string
  imageUrl: string
  voteCount: number
  categories: string[]

  constructor(props: Movie) {
    this.id = props.getId()
    this.title = props.getTitle()
    this.originalTitle = props.getOriginalTitle()
    this.synopsis = props.getSynopsis()
    this.ageRating = props.getAgeRating()
    this.releaseDate = props.getReleaseDate()
    this.duration = this.formatDuration(props.getDurationMinutes())
    this.status = this.translateMovieStatus(props.getStatus())
    this.language = props.getLanguage()
    this.budget = this.formatMoney(props.getBudget())
    this.revenue = this.formatMoney(props.getRevenue())
    this.imageUrl = props.getImageUrl()
    this.voteCount = props.getVoteCount()
    this.categories = props.getCategories()
  }

  private formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}m`;
  }

  private formatMoney(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  private translateMovieStatus(status: MovieStatus): string {
    return MovieStatusPT[status] || 'Desconhecido';
  }
}