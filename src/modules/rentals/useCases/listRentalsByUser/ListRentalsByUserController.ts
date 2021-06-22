import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { ListRentalsByUserUseCase } from './ListRentalsByUserUseCase';

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const { id } = request.user;

    const rentals = await listRentalsByUserUseCase.execute({ user_id: id });

    return response.json(rentals).send();
  }
}

export { ListRentalsByUserController };
