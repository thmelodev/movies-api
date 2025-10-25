import { Language } from "../../domain/Language";

export class LanguageDTO {
  id: string;
  name: string;

  constructor(props: Language) {
    this.id = props.getId();
    this.name = props.getName();
  }
}