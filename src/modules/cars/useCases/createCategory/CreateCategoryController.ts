import { Request, Response } from 'express';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  private createCategoryUseCase: CreateCategoryUseCase;

  constructor(createCategoryUseCase: CreateCategoryUseCase) {
    this.createCategoryUseCase = createCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    const newCategory = this.createCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(newCategory);
  }
}

export { CreateCategoryController };
