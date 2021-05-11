import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_place,
    name,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_place,
      name,
    });

    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
