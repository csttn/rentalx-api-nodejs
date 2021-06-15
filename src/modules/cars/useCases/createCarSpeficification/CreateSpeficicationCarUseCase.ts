import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@errors/AppError';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateSpecificationCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError('Car does not exists');
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    if (!specifications) {
      throw new AppError('Specification does not exists');
    }
    carExists.specifications = specifications;

    await this.carsRepository.create(carExists);
    return carExists;
  }
}

export { CreateSpecificationCarUseCase };
