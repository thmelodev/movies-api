import { InvalidPropsException } from "./exceptions/InvalidPropsException";

interface LanguageProps {
  id: string;
  name: string;
}

export class Language {
  private id: string;
  private name: string;

  public static create(props: LanguageProps): Language {
    const instance = new Language();
    instance.setId(props.id?.trim());
    instance.setName(props.name?.trim());
    return instance;
  }

  private setId(id: string): void {
    if (!id || id.length === 0) {
      throw new InvalidPropsException('Código de idioma inválido.');
    }
    this.id = id;
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