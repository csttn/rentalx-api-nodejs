import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/entities/Category';
class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);

    return category;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });
    this.categories.push(category);
  }
  async delete(name: string): Promise<void> {
    const categoryIndex = this.categories.findIndex(
      (category) => category.name === name
    );

    this.categories.splice(categoryIndex, 1);
  }
  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
}

export { CategoriesRepositoryInMemory };
