import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);
  if (categoryAlreadyExists) {
    return response.status(400).json({ error: 'Category name already Exists' });
  }

  //criando categoria
  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

//listando categorias
categoriesRoutes.get('/', (request, response) => {
  const all = categoriesRepository.list();

  return response.json(all);
});

//buscando categoria por name
categoriesRoutes.get('/', (request, response) => {
  const { name } = request.body;

  const resp = categoriesRepository.findByName(name);

  return response.json(resp);
});

//deletando categoria por name
categoriesRoutes.delete('/', (request, response) => {
  const { name } = request.body;

  categoriesRepository.delete(name);

  return response.send();
});

export { categoriesRoutes };
