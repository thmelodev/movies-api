import { randomUUID } from "node:crypto"
import { InvalidPropsException } from "./exceptions/InvalidPropsException"

interface CategoryProps {
  id: string
  name: string
}

export class Category {
  private id: string
  private name: string

  private constructor(id?: string) {
    this.id = id || randomUUID()
  }

  public static create(props: Omit<CategoryProps, 'id'>): Category {
    const instance = new Category()
    instance.setName(props.name?.trim())
    return instance
  }

  public static load(props: CategoryProps): Category {
    const instance = new Category(props.id)
    instance.setName(props.name?.trim())
    return instance
  }

  private setName(name: string): void {
    if(!name || name.length === 0) {
      throw new InvalidPropsException('Nome inválido.')
    }
    this.name = name
  }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }
}