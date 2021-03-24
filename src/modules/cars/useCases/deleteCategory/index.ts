import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import { DeleteCategoryController } from './DeleteCategoryController';
import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

const categoriesRepository = CategoriesRepository.getInstance();
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoriesRepository);

const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
);

export { deleteCategoryController, deleteCategoryUseCase };
