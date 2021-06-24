import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { AppError } from '@errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { createAdd } from 'typescript';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let userRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
    userRepositoryInMemory = new UsersRepositoryInMemory();
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'marca',
      category_id: 'category_id',
      daily_rate: 10,
      description: 'description',
      fine_amount: 40,
      license_plate: 'license',
      name: 'sdfsdsf',
    });

    const user = await userRepositoryInMemory.create({
      driver_license: 'sdsdf',
      email: 'emailuser',
      name: 'Name user',
      password: 'password',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
    });
    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if is another open to the same user', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'marca',
      category_id: 'category_id',
      daily_rate: 10,
      description: 'description',
      fine_amount: 40,
      license_plate: 'license',
      name: 'sdfsdsf',
    });
    const car2 = await carsRepositoryInMemory.create({
      brand: 'marca22',
      category_id: 'category_id22',
      daily_rate: 120,
      description: 'description2',
      fine_amount: 402,
      license_plate: 'license2',
      name: 'sdfsdsf22',
    });

    const user = await userRepositoryInMemory.create({
      driver_license: 'sdsdf',
      email: 'emailuser',
      name: 'Name user',
      password: 'password',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car2.id,
        user_id: user.id,
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental if is another open to the same car', async () => {
    const car = await carsRepositoryInMemory.create({
      brand: 'marca',
      category_id: 'category_id',
      daily_rate: 10,
      description: 'description',
      fine_amount: 40,
      license_plate: 'license',
      name: 'sdfsdsf',
    });

    const user = await userRepositoryInMemory.create({
      driver_license: 'sdsdf',
      email: 'emailuser',
      name: 'Name user',
      password: 'password',
    });
    const user2 = await userRepositoryInMemory.create({
      driver_license: 'sdsdf2',
      email: 'emailuser2',
      name: 'Name user2',
      password: 'password2',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: user.id,
      expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
    });
    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: user2.id,
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
      })
    ).rejects.toEqual(new AppError('Car is unavailable'));
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'hour'),
      })
    ).rejects.toEqual(new AppError('Invalid return time!'));
  });
});
