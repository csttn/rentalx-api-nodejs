import { Router } from 'express';

import { PostgresCategoriesRepository } from '../repositories/PostgresCategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';
import { DeleteCategoryService } from '../services/DeleteCategoryService';
import { FindByName } from '../services/FindByNameCategoryService';
import { ListAllCategories } from '../services/ListCategoriesService';

const categoriesRoutes = Router();

const categoriesRepository = new PostgresCategoriesRepository();

//criando categoria
categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  const newCategory = createCategoryService.execute({ name, description });

  return response.status(201).json(newCategory);
});

//listando categorias
categoriesRoutes.get('/', (request, response) => {
  const listAllCategories = new ListAllCategories(categoriesRepository);

  const allCategories = listAllCategories.execute();

  return response.json(allCategories);
});

//buscando categoria por name
categoriesRoutes.get('/category', (request, response) => {
  const { name } = request.body;

  const findByName = new FindByName(categoriesRepository);

  const category = findByName.execute({ name });

  return response.json(category);
});

//deletando categoria por name
categoriesRoutes.delete('/', (request, response) => {
  const { name } = request.body;

  const deleteCategoryService = new DeleteCategoryService(categoriesRepository);

  deleteCategoryService.execute({ name });

  return response.send();
});

export { categoriesRoutes };
