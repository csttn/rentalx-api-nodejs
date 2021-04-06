import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { DeleteCategoryController } from './DeleteCategoryController';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

export default (): DeleteCategoryController => {
  const categoriesRepository = new CategoriesRepository();
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);

  const deleteCategoryController = new DeleteCategoryController(
    deleteCategoryUseCase
  );

  return deleteCategoryController;
};
