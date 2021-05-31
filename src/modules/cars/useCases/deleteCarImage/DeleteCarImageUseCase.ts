import { inject, injectable } from 'tsyringe';
import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { AppError } from '@errors/AppError';
import { deleteFile } from '@utils/file';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  async execute({ id }: IRequest) {
    const carsImageNotExists = await this.carsImagesRepository.findById(id);

    if (!carsImageNotExists) {
      throw new AppError('Image is not exists');
    }
    await deleteFile(`./tmp/cars/${carsImageNotExists.image_name}`);

    await this.carsImagesRepository.delete(id);
  }
}

export { DeleteCarImageUseCase };
