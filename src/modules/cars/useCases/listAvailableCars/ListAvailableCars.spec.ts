import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'name Car',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list available cars by Brand', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'name Car1',
    });
    const car2 = await carsRepositoryInMemory.create({
      brand: 'Brand2',
      category_id: 'category_id2',
      daily_rate: 100,
      description: 'Description car2',
      fine_amount: 60,
      license_plate: 'ABC2',
      name: 'name Car2',
    });
    const car3 = await carsRepositoryInMemory.create({
      brand: 'Brand2',
      category_id: 'category_id3',
      daily_rate: 100,
      description: 'Description car3',
      fine_amount: 60,
      license_plate: 'ABC4',
      name: 'name Car4',
    });

    const cars = await listCarsUseCase.execute({ brand: 'Brand2' });

    expect(cars).toEqual([car2, car3]);
  });

  it('should be able to list available cars by Name', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'name1',
    });
    const car2 = await carsRepositoryInMemory.create({
      brand: 'Brand2',
      category_id: 'category_id2',
      daily_rate: 100,
      description: 'Description car2',
      fine_amount: 60,
      license_plate: 'ABC2',
      name: 'name2',
    });

    const cars = await listCarsUseCase.execute({ name: 'name2' });

    expect(cars).toEqual([car2]);
  });

  it('should be able to list available cars by Category', async () => {
    const car1 = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id1',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'name1',
    });
    const car2 = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id2',
      daily_rate: 100,
      description: 'Description car2',
      fine_amount: 60,
      license_plate: 'ABC2',
      name: 'name2',
    });
    const car3 = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id2',
      daily_rate: 100,
      description: 'Description car2',
      fine_amount: 60,
      license_plate: 'ABC2',
      name: 'name2',
    });

    const cars = await listCarsUseCase.execute({ category_id: 'category_id1' });

    expect(cars).toEqual([car1]);
  });
});
