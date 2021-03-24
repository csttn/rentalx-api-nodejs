import { Category } from '../model/Category';

// DTO = Data Transfer Object
interface ICreateCategoryDTO {
  name: string;
  description?: string;
}

interface ICategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): Category;
  delete(name: string): void;
}

export { ICategoriesRepository, ICreateCategoryDTO };
