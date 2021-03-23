import { Category } from '../model/Category';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    //atribuindo valor que sera recebido pelo construtor a variavel privada categoriesRepository
    this.categoriesRepository = categoriesRepository;
  }

  execute({ name, description }: IRequest): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error('Category already Exists');
    }

    const category = this.categoriesRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryService };
