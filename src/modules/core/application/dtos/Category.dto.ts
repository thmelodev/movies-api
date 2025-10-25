export class CategoryDTO {
  id: string;
  name: string;

  constructor(props: CategoryDTO) {
    this.id = props.id;
    this.name = props.name;
  }
}