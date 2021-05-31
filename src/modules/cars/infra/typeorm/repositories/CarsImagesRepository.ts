import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { CarImage } from '../entities/CarImage';
import { Repository, getRepository } from 'typeorm';
import { AppError } from '../../../../../shared/errors/AppError';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;
  constructor() {
    this.repository = getRepository(CarImage);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<CarImage> {
    const image = await this.repository.findOne(id);
    return image;
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository };
