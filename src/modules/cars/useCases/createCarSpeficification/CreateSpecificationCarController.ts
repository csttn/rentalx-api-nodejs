import { Request, Response } from 'express';
import { CreateSpecificationCarUseCase } from './CreateSpeficicationCarUseCase';
import { container } from 'tsyringe';

class CreateCarSpecificationCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createSpecificationCarUseCase = container.resolve(
      CreateSpecificationCarUseCase
    );
    const car = await createSpecificationCarUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.json(car).send();
  }
}

export { CreateCarSpecificationCarController };
