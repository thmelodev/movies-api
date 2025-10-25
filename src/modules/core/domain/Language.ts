import { randomUUID } from "node:crypto";
import { InvalidPropsException } from "./exceptions/InvalidPropsException";

interface LanguageProps {
  code: string;
  name: string;
}

export class Language {
  private id: string;
  private code: string;
  private name: string;

  constructor(id?: string) {
    this.id = id || randomUUID();
  }

  public static create(props: Omit<LanguageProps, 'id'>): Language {
    const instance = new Language();
    instance.build(props);
    return instance;
  }

  private build(props: Omit<LanguageProps, 'id'>): void {
    this.setCode(props.code?.trim());
    this.setName(props.name?.trim());
  }

  private setCode(code: string): void {
    if (!code || code.length === 0) {
      throw new InvalidPropsException('Código de idioma inválido.');
    }
    this.code = code;
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

  public getCode(): string {
    return this.code;
  }

  public getName(): string {
    return this.name;
  }
}