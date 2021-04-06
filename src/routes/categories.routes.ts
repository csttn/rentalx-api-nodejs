import { Router } from 'express';

import multer from 'multer';

import listCategoriesController from '../modules/cars/useCases/listCategories';
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/CreateCategoryController';
import deleteCategoryController from '../modules/cars/useCases/deleteCategory';
import importCategoryController from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();

//criando categoria
categoriesRoutes.post('/', createCategoryController.handle);

//listando categorias
categoriesRoutes.get('/', (request, response) => {
  return listCategoriesController().handle(request, response);
});

//deletando categoria por name
categoriesRoutes.delete('/', (request, response) => {
  return deleteCategoryController().handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController().handle(request, response);
});

export { categoriesRoutes };
