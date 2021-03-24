import { Router } from 'express';

import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { createCategoryController } from '../modules/cars/useCases/createCategory';
import { deleteCategoryController } from '../modules/cars/useCases/deleteCategory';

const categoriesRoutes = Router();

//criando categoria
categoriesRoutes.post('/', (request, response) => {
  return createCategoryController.handle(request, response);
});

//listando categorias
categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController.handle(request, response);
});

//deletando categoria por name
categoriesRoutes.delete('/', (request, response) => {
  return deleteCategoryController.handle(request, response);
});

export { categoriesRoutes };
