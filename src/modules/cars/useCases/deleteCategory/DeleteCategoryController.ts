import { Request, Response } from 'express';

import { DeleteCategoryUseCase } from './DeleteCategoryUseCase';

class DeleteCategoryController {
  private deleteCategoryUseCase: DeleteCategoryUseCase;

  constructor(deleteCategoryUseCase: DeleteCategoryUseCase) {
    this.deleteCategoryUseCase = deleteCategoryUseCase;
  }

  handle(request: Request, response: Response): Response {
    const { name } = request.body;

    this.deleteCategoryUseCase.execute({ name });

    return response.send();
  }
}

export { DeleteCategoryController };
