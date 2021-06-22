import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';
import { Repository, getRepository } from 'typeorm';
import {
  ICreateRentalDTO,
  IUpdateRentalDTO,
} from '@modules/rentals/dto/ICreateRentalDTO';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return await this.repository.findOne({ car_id, end_date: null });
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return await this.repository.findOne({ user_id, end_date: null });
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne({ id });
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      end_date,
      expected_return_date,
      car_id,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }

  async update({
    end_date,
    expected_return_date,
    id,
    total,
  }: IUpdateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      id,
      end_date,
      expected_return_date,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }

  async listRentalsByUser(user_id: string): Promise<Rental[]> {
    return await this.repository.find({ user_id });
  }
}

export { RentalsRepository };
