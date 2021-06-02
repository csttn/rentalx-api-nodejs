import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { AppError } from '@errors/AppError';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe('Create Rental', () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '13223',
      user_id: '123123',
      expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
    });
    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
      });
      await createRentalUseCase.execute({
        car_id: '1322333',
        user_id: '123123',
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
      });
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '12312355',
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'day'),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time ', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayjsDateProvider.addTimeToDate(1, 'hour'),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
