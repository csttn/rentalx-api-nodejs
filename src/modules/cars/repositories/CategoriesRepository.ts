import { Category } from '../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private constructor() {
    this.categories = [];
  }

  private static INSTANCE: CategoriesRepository;

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      return (CategoriesRepository.INSTANCE = new CategoriesRepository());
    }

    return CategoriesRepository.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();

    //criando objeto sem referenciar atributo por atributo
    //utilizando o metodo assign, que copia os valores para um obj (no caso o category)
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return category;
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((item) => item.name === name);

    return category;
  }

  delete(name: string): void {
    const categoryIndex = this.categories.findIndex(
      (item) => item.name === name
    );

    this.categories.splice(categoryIndex, 1);
  }
}

export { CategoriesRepository };
