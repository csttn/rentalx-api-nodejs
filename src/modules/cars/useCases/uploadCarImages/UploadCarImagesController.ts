import { Request, Response } from 'express';
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase';
import { container } from 'tsyringe';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarsImageUseCase = container.resolve(UploadCarImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarsImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
