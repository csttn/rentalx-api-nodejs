import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_place: 'ABC',
      name: 'name Car',
    });
  });
});
