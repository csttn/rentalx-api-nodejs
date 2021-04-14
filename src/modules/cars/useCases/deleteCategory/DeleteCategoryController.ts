import { Request, Response } from 'express';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';
import { container } from 'tsyringe';

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    await deleteCategoryUseCase.execute({ name });

    return response.send();
  }
}

export { DeleteCategoryController };
