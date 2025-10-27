import { Category } from "../../domain/Category";

export class CategoryDTO {
  id: string;
  name: string;

  constructor(props: Category) {
    this.id = props.getId();
    this.name = props.getName();
  }
}