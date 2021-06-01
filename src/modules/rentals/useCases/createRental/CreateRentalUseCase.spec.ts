import { RentalsRepositoryInMemory } from '@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { AppError } from '@errors/AppError';
import dayjs from 'dayjs';

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;

describe('Create Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      car_id: '13223',
      user_id: '123123',
      expected_return_date: dayAdd24Hours,
    });
    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: '1322333',
        user_id: '123123',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayAdd24Hours,
      });
      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '12312355',
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time ', async () => {
    expect(async () => {
      const dayAdd1Hour = dayjs().add(1, 'hour').toDate();

      await createRentalUseCase.execute({
        car_id: '13223',
        user_id: '123123',
        expected_return_date: dayAdd1Hour,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
