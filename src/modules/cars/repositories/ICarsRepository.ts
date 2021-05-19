import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { IFindAvailableDTO } from '../dto/IFindAvailableDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>;
}

export { ICarsRepository };
