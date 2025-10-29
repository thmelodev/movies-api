import { randomUUID } from "node:crypto"
import { InvalidPropsException } from "./exceptions/InvalidPropsException"

export enum MovieStatus {
  RELEASED = 'RELEASED',
  UPCOMING = 'UPCOMING',
  CANCELLED = 'CANCELLED',
}

export interface MovieProps {
  id: string
  title: string
  originalTitle: string
  synopsis: string
  ageRating: number
  releaseDate: Date
  durationMinutes: number
  status: MovieStatus
  language: string
  budget: number
  revenue: number
  //TODO: add backgroundUrl and trailerUrl
  imageUrl: string
  negativeVoteCount: number
  positiveVoteCount: number
  categories: string[]
}

export class Movie {
  private id: string
  private title: string
  private originalTitle: string
  private synopsis: string
  private ageRating: number
  private releaseDate: Date
  private durationMinutes: number
  private status: MovieStatus
  private language: string
  private budget: number
  private revenue: number
  private imageUrl: string
  private negativeVoteCount: number
  private positiveVoteCount: number
  private categories: string[]

  constructor(id?: string) {
    this.id = id || randomUUID()
  }

  public static create(props: Omit<MovieProps, 'id'>): Movie {
    const instance = new Movie()
    instance.build(props)
    return instance
  }

  public static load(props: MovieProps): Movie {
    const instance = new Movie(props.id)
    instance.build(props)
    return instance
  }

  private build(props: Omit<MovieProps, 'id'>): void {
    this.setTitle(props.title?.trim())
    this.setOriginalTitle(props.originalTitle?.trim())
    this.setSynopsis(props.synopsis?.trim())
    this.setAgeRating(props.ageRating)
    this.setReleaseDate(props.releaseDate)
    this.setDurationMinutes(props.durationMinutes)
    this.setStatus(props.status)
    this.setLanguage(props.language?.trim())
    this.setBudget(props.budget)
    this.setRevenue(props.revenue)
    this.setImageUrl(props.imageUrl?.trim())
    this.setCategories(props.categories)
    this.setNegativeVoteCount(props.negativeVoteCount)
    this.setPositiveVoteCount(props.positiveVoteCount)
  }

  public update(props: Omit<MovieProps, 'id'>): void {
    this.build(props)
  }
  
  private setTitle(title: string): void {
    if(!title || title.length === 0) {
      throw new InvalidPropsException('Título inválido.')
    }
    this.title = title;
  }

  private setOriginalTitle(originalTitle: string): void {
    if(!originalTitle || originalTitle.length === 0) {
      throw new InvalidPropsException('Título original inválido.')
    }
    this.originalTitle = originalTitle;
  }

  private setSynopsis(synopsis: string): void {
    if(!synopsis || synopsis.length === 0) {
      throw new InvalidPropsException('Sinopse inválida.')
    }
    this.synopsis = synopsis;
  }

  private setAgeRating(ageRating: number): void {
    if(!ageRating || ageRating < 0) {
      throw new InvalidPropsException('Classificação indicativa inválida.')
    }
    this.ageRating = ageRating;
  }

  private setReleaseDate(releaseDate: Date): void {
    if(!releaseDate || isNaN(releaseDate.getTime())) {
      throw new InvalidPropsException('Data de lançamento inválida.')
    }
    this.releaseDate = releaseDate; 
  }

  private setDurationMinutes(durationMinutes: number): void {
    if(!durationMinutes || durationMinutes < 0) {
      throw new InvalidPropsException('Duração inválida.')
    }
    this.durationMinutes = durationMinutes;
  }

  private setStatus(status: MovieStatus): void {
    if(!status || !(status in MovieStatus)) {
      throw new InvalidPropsException('Status inválido.')
    }
    this.status = status;
  }

  private setLanguage(language: string): void {
    if(!language || language.length === 0) {
      throw new InvalidPropsException('Idioma inválido.')
    }
    this.language = language;
  }

  private setBudget(budget: number): void {
    if(!budget || budget < 0) {
      throw new InvalidPropsException('Orçamento inválido.')
    }
    this.budget = budget;
  }

  private setRevenue(revenue: number): void {
    if(!revenue || revenue < 0) {
      throw new InvalidPropsException('Receita inválida.')
    }
    this.revenue = revenue;
  }

  private setImageUrl(imageUrl: string): void {
    if(!imageUrl || imageUrl.length === 0) {
      throw new InvalidPropsException('URL da imagem inválida.')
    }
    this.imageUrl = imageUrl;
  }

  private setNegativeVoteCount(negativeVoteCount: number): void {
    this.negativeVoteCount = negativeVoteCount || 0;
  }

  private setPositiveVoteCount(positiveVoteCount: number): void {
    this.positiveVoteCount = positiveVoteCount || 0;
  }

  private setCategories(categories: string[]): void {
    if(!categories || categories.length === 0) {
      throw new InvalidPropsException('O filme deve ter ao menos uma categoria.')
    }
    this.categories = categories;
  }

  public getId(): string {
    return this.id;
  }

  public getTitle(): string {
    return this.title;
  }

  public getOriginalTitle(): string {
    return this.originalTitle;
  }

  public getSynopsis(): string {
    return this.synopsis;
  }

  public getAgeRating(): number {
    return this.ageRating;
  }

  public getReleaseDate(): Date {
    return this.releaseDate;
  }

  public getDurationMinutes(): number {
    return this.durationMinutes;
  }

  public getStatus(): MovieStatus {
    return this.status;
  }

  public getLanguage(): string {
    return this.language;
  }

  public getBudget(): number {
    return this.budget;
  }

  public getRevenue(): number {
    return this.revenue;
  }

  public getImageUrl(): string {
    return this.imageUrl;
  }

  public getVoteCount(): number {
    return this.negativeVoteCount + this.positiveVoteCount;
  }

  public getNegativeVotesCount(): number {
    return this.negativeVoteCount;
  }

  public getPositiveVotesCount(): number {
    return this.positiveVoteCount;
  }

  public getCategories(): string[] {
    return this.categories;
  }
}