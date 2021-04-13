import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';
import { container } from 'tsyringe';

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    try {
      const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

      await createCategoryUseCase.execute({
        name,
        description,
      });

      return response.status(201).send();
    } catch (error) {
      return response.status(404).send();
    }
  }
}

export { CreateCategoryController };
