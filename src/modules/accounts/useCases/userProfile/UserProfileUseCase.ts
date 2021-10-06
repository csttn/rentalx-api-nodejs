import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UserMap } from '@modules/accounts/mappers/UserMap';
import { IUserResponseDTO } from '@modules/accounts/dtos/IUserResponseDTO';

@injectable()
class UserProfileUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.usersRepository.findById(id);

    return UserMap.toDto(user);
  }
}

export { UserProfileUseCase };
