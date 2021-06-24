import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';

import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

@injectable()
class CreateUserUseCase {
  private userRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository
  ) {
    this.userRepository = userRepository;
  }

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<User> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const user = await this.userRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });

    return user;
  }
}

export { CreateUserUseCase };
