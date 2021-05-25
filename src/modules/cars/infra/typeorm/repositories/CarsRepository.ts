import { Repository, getRepository } from 'typeorm';
import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { IFindAvailableDTO } from '@modules/cars/dto/IFindAvailableDTO';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async findAvailable({
    brand,
    name,
    category_id,
  }: IFindAvailableDTO): Promise<Car[]> {
    //buscando todos os carros
    const cars = await this.repository.find({ available: true });

    const carsFiltered = [];

    if (!brand && !name && !category_id) {
      return cars;
    }

    if (name) {
      const carName = cars.filter((car) => car.name === name);
      carsFiltered.push(carName);
    }

    if (brand) {
      const carBrand = cars.filter((car) => car.brand === brand);
      carsFiltered.push(carBrand);
    }

    if (category_id) {
      const carCategory = cars.filter((car) => car.category_id === category_id);
      carsFiltered.push(carCategory);
    }

    //extraindo a profundidando de inserção de arrays gerada pelo push, com  uma função recursiva
    function flattenDeep(arr1: Car[]) {
      return arr1.reduce(
        (acc, val) =>
          Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
        []
      );
    }

    return flattenDeep(carsFiltered);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }
  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne({ id: car_id });
    return car;
  }
}

export { CarsRepository };
