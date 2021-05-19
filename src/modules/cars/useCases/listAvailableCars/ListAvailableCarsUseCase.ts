import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({ brand, name, category_id }: IRequest): Promise<Car[]> {
    return await this.carsRepository.findAvailable({
      brand,
      name,
      category_id,
    });
  }
}

export { ListAvailableCarsUseCase };
