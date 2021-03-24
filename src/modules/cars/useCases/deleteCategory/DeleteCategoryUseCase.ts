import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
}

class DeleteCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    //atribuindo valor que sera recebido pelo construtor a variavel privada categoriesRepository
    this.categoriesRepository = categoriesRepository;
  }

  execute({ name }: IRequest) {
    const categoryNotExists = this.categoriesRepository.findByName(name);
    if (!categoryNotExists) {
      throw new Error('Category is not exists');
    }

    this.categoriesRepository.delete(name);
  }
}

export { DeleteCategoryUseCase };
