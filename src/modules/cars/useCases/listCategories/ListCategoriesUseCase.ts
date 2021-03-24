import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    //atribuindo valor que sera recebido pelo construtor a variavel privada categoriesRepository
    this.categoriesRepository = categoriesRepository;
  }

  execute(): Category[] {
    const allCategories = this.categoriesRepository.list();

    return allCategories;
  }
}

export { ListCategoriesUseCase };
