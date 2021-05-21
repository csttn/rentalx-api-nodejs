import { CreateSpecificationCarUseCase } from './CreateSpeficicationCarUseCase';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@errors/AppError';

let createSpecificationCarUseCase: CreateSpecificationCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createSpecificationCarUseCase = new CreateSpecificationCarUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it('should be able to add a new specification to a now-existent the car', async () => {
    expect(async () => {
      const car_id = '2123123';
      const specifications_id = ['sdfsdfs'];

      await createSpecificationCarUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    // creiando carro
    const car = await carsRepositoryInMemory.create({
      brand: 'Brand',
      category_id: 'category_id',
      daily_rate: 100,
      description: 'Description car',
      fine_amount: 60,
      license_plate: 'ABC',
      name: 'name Car',
    });
    //criando a primiera especificação
    const spec = await specificationsRepositoryInMemory.create({
      description: 'Teste Spec',
      name: 'Name Spec',
    });

    // criando a segunda especificação
    const spec2 = await specificationsRepositoryInMemory.create({
      description: 'Teste2 Spec2',
      name: 'Name2 Spec2',
    });
    //criando array com ids de especificações criadas
    const specifications_id = [spec.id, spec2.id];

    //adicionando especificações criadas ao carro criado
    await createSpecificationCarUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it('should not be able to add a specification that was not created to the car', () => {
    expect(async () => {
      // criando carro
      const car = await carsRepositoryInMemory.create({
        brand: 'Brand',
        category_id: 'category_id',
        daily_rate: 100,
        description: 'Description car',
        fine_amount: 60,
        license_plate: 'ABC',
        name: 'name Car',
      });

      //criando array com ids de especificações que não existem
      const specifications_id = ['sdfsfds'];

      //adicionando especificações criadas ao carro criado
      await createSpecificationCarUseCase.execute({
        car_id: car.id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
