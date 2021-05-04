import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteCategoryUseCase } from '@modules/cars/useCases/deleteCategory/DeleteCategoryUseCase';

class DeleteCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const deleteCategoryUseCase = container.resolve(DeleteCategoryUseCase);

    await deleteCategoryUseCase.execute({ name });

    return response.send();
  }
}

export { DeleteCategoryController };
