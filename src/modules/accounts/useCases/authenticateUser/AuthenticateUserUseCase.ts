import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}
@injectable()
class AuthenticateUserUseCase {
  private userRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    userRepository: IUsersRepository
  ) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificando se o usuario existe
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    //validando senha
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    //gerando jwt
    const token = sign({}, '484f1c5d540e55294143e3d476346509', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
