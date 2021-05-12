import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class ListCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    return await this.carsRepository.list();
  }
}

export { ListCarsUseCase };
