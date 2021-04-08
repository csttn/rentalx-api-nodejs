import { getRepository, Repository } from 'typeorm';

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository';

import { Category } from '../../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repositoryCategory: Repository<Category>;
  constructor() {
    this.repositoryCategory = getRepository(Category);
  }

  async list(): Promise<Category[]> {
    const all = await this.repositoryCategory.find();

    return all;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repositoryCategory.create({
      description,
      name,
    });

    await this.repositoryCategory.save(category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repositoryCategory.findOne({
      name,
    });
    return category;
  }

  async delete(name: string): Promise<void> {
    await this.repositoryCategory.delete({ name });
  }
}

export { CategoriesRepository };
