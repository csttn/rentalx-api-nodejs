import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { injectable } from 'tsyringe';
import { inject } from 'tsyringe';
import { AppError } from '@errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.listRentalsByUser(user_id);

    if (!rentals) {
      throw new AppError('This user not contain rentals');
    }

    return rentals;
  }
}

export { ListRentalsByUserUseCase };
