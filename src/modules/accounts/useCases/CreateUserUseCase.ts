import { inject, injectable } from 'tsyringe';
import {
  ICreateUserDTO,
  IUsersRepository,
} from '../repositories/IUsersRepository';

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
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new Error('User already Exists');
    }

    await this.userRepository.create({
      name,
      password,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
