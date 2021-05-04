import { Router } from 'express';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/cars/useCases/deleteCategory/DeleteCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';

import multer from 'multer';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const deleteCategoryController = new DeleteCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

//criando categoria
categoriesRoutes.post('/', createCategoryController.handle);

//listando categorias
categoriesRoutes.get('/', listCategoriesController.handle);

//deletando categoria por name
categoriesRoutes.delete('/', deleteCategoryController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
