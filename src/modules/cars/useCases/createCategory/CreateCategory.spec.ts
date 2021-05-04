import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { AppError } from '@shared/errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Nome',
      description: 'Desc',
    };
    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    // esperando que tenha uma propriedade id apos ser criada
    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with the existing name', async () => {
    //esperando um erro retornando que seja da isntacia do AppError
    expect(async () => {
      const category = {
        name: 'Nome',
        description: 'Desc',
      };
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
