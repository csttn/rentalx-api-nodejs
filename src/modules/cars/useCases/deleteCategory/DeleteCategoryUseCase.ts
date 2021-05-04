import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
}

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name }: IRequest) {
    const categoryNotExists = await this.categoriesRepository.findByName(name);
    if (!categoryNotExists) {
      throw new AppError('Category is not exists');
    }

    await this.categoriesRepository.delete(name);
  }
}

export { DeleteCategoryUseCase };
