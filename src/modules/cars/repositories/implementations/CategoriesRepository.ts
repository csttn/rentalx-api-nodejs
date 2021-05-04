import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';
import { Category } from '@modules/cars/entities/Category';
import { Repository, getRepository } from 'typeorm';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;
  constructor() {
    this.repository = getRepository(Category);
  }

  async list(): Promise<Category[]> {
    const all = await this.repository.find();

    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({
      name,
    });
    return category;
  }

  async delete(name: string): Promise<void> {
    await this.repository.delete({ name });
  }
}

export { CategoriesRepository };
