import {
  ICreateRentalDTO,
  IUpdateRentalDTO,
} from '@modules/rentals/dto/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../../entities/Rental';

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === id && !rental.end_date
    );
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async update({
    total,
    id,
    expected_return_date,
    end_date,
  }: IUpdateRentalDTO): Promise<Rental> {
    const rentalIndex = this.rentals.findIndex((rental) => rental.id === id);

    this.rentals[rentalIndex].total = total;
    this.rentals[rentalIndex].end_date = end_date;

    return this.rentals[rentalIndex];
  }

  async listRentalsByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }
}

export { RentalsRepositoryInMemory };
