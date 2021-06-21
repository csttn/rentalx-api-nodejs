import { ICreateCarDTO } from '../dto/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { IFindAvailableDTO } from '../dto/IFindAvailableDTO';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findAvailable(data: IFindAvailableDTO): Promise<Car[]>;
  updateAvailable(id:string, available: boolean): Promise<void>
}

export { ICarsRepository };
