import { inject, injectable } from 'tsyringe';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@errors/AppError';
import { ICreateCarDTO } from '@modules/cars/dto/ICreateCarDTO';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository
  ) {}

  async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    //verificando a existencia de caarros com a mesma lisença
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError('Car Already exists!');
    }
    //criando objeto carro
    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      license_plate,
      fine_amount,
      name,
    });

    return car;
  }
}

export { CreateCarUseCase };
