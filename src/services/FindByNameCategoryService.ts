import { Category } from '../model/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

class FindByName {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  execute({ name }: IRequest): Category {
    const category = this.categoriesRepository.findByName(name);

    if (!category) {
      throw new Error('Category name not Exists');
    }

    return category;
  }
}

export { FindByName };
