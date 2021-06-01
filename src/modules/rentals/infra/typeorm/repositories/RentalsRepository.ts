import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';
import { Repository, getRepository } from 'typeorm';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ car_id });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ user_id });
  }

  create(
    car_id: string,
    user_id: string,
    expected_return_date: Date
  ): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
}

export { RentalsRepository };
