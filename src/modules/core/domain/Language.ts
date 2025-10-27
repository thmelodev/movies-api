import { randomUUID } from "node:crypto";
import { InvalidPropsException } from "./exceptions/InvalidPropsException";

interface LanguageProps {
  id: string;
  name: string;
}

export class Language {
  private id: string;
  private name: string;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  public static create(props: Omit<LanguageProps, 'id'>): Language {
    const instance = new Language();
    instance.setName(props.name?.trim());
    return instance;
  }

  public static load(props: LanguageProps): Language {
    const instance = new Language(props.id);
    instance.setName(props.name?.trim());
    return instance;
  }

  private setName(name: string): void {
    if (!name || name.length === 0) {
      throw new InvalidPropsException('Nome de idioma inválido.');
    }
    this.name = name;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }
}