import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserProfileUseCase } from './UserProfileUseCase';

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const { id } = request.user;

    const user = await userProfileUseCase.execute(id);

    console.log(user);
    return response.json(user);
  }
}

export { UserProfileController };
