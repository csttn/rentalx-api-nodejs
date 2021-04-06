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

  async execute({ name }: IRequest) {
    const categoryNotExists = await this.categoriesRepository.findByName(name);
    if (!categoryNotExists) {
      throw new Error('Category is not exists');
    }

    await this.categoriesRepository.delete(name);
  }
}

export { DeleteCategoryUseCase };
