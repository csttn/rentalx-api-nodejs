import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';
import { IFindAvailableDTO } from '@modules/cars/dto/IFindAvailableDTO';
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
    license_plate,
    name,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
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

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable({
    brand,
    name,
    category_id,
  }: IFindAvailableDTO): Promise<Car[]> {
    const carsFiltered = [];

    if (!brand && !name && !category_id) {
      return this.cars;
    }

    if (name) {
      const carName = this.cars.filter((car) => car.name === name);
      carsFiltered.push(carName);
    }

    if (brand) {
      const carBrand = this.cars.filter((car) => car.brand === brand);
      carsFiltered.push(carBrand);
    }

    if (category_id) {
      const carCategory = this.cars.filter(
        (car) => car.category_id === category_id
      );
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

  async findById(car_id: string): Promise<Car> {
    return this.cars.find((car) => car.id === car_id);
  }

   async updateAvailable(id: string, available: boolean): Promise<void> {
     const findIndex = this.cars.findIndex((car) => car.id === id)
     
     this.cars[findIndex].available = available

   }
}

export { CarsRepositoryInMemory };
