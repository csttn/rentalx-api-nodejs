import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IDevolutionRentalDTO } from '@modules/rentals/dto/ICreateRentalDTO';

import { AppError } from '@errors/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ id, user_id }: IDevolutionRentalDTO): Promise<Rental> {
    const minimum_daily = 1;
    let totalToPay = 0;

    const rental = await this.rentalsRepository.findById(id);

    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('Rental does not exists');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    if (delay > 0) {
      totalToPay += delay * car.fine_amount;
    }

    totalToPay += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = totalToPay;

    await this.rentalsRepository.update(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
