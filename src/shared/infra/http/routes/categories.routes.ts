import { Router } from 'express';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/cars/useCases/deleteCategory/DeleteCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/listCategoriesController';

import { ensureAuthenticated } from '@middlewares/ensureAuthenticated';
import { ensureAdmin } from '@middlewares/ensureAdmin';

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
categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

//listando categorias
categoriesRoutes.get('/', listCategoriesController.handle);

//deletando categoria por name
categoriesRoutes.delete(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  deleteCategoryController.handle
);

categoriesRoutes.post(
  '/import',
  ensureAuthenticated,
  ensureAdmin,
  upload.single('file'),
  importCategoryController.handle
);

export { categoriesRoutes };
