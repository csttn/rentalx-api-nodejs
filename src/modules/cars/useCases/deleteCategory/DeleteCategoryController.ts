import { Request, Response } from 'express';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(deleteCategoryUseCase: DeleteCategoryUseCase) {
    this.deleteCategoryUseCase = deleteCategoryUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    await this.deleteCategoryUseCase.execute({ name });

    return response.send();
  }
}

export { DeleteCategoryController };
