import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  list(): Promise<Car[]>;
}

export { ICarsRepository };
