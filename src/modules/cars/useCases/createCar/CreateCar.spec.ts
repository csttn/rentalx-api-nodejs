import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';
import { AppError } from '@errors/AppError';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'name Car',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'Car1',
    });
    //Fazendo cópia de carro para validar a integridade
    await expect(
      createCarUseCase.execute({
        brand: 'Brand',
        category_id: 'category_id',
        daily_rate: 100,
        description: 'Description car',
        fine_amount: 60,
        license_plate: 'ABC',
        name: 'Car2',
      })
    ).rejects.toEqual(new AppError('Car Already exists!'));
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABCD',
      name: 'Car Available',
    });

    expect(car.available).toBe(true);
  });
});
