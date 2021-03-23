import { Category } from '../model/Category';

// DTO = Data Transfer Object
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    //criando objeto sem referenciar atributo por atributo
    //utilizando o metodo assign, que copia os valores para um obj (no caso o category)
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((item) => item.name === name);

    return category;
  }

  delete(name: string): void {
    this.categories.
  }

  constructor() {
    this.categories = [];
  }
}

export { CategoriesRepository };
