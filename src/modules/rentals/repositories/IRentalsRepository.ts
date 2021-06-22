import { Rental } from '../infra/typeorm/entities/Rental';
import {
  ICreateRentalDTO,
  IUpdateRentalDTO,
} from '@modules/rentals/dto/ICreateRentalDTO';

interface IRentalsRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
  create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
  update({
    total,
    id,
    expected_return_date,
    end_date,
  }: IUpdateRentalDTO): Promise<Rental>;
  listRentalsByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
