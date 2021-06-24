import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

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
  refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // verificando se o usuario existe
    const user = await this.userRepository.findByEmail(email);

    //config auth info
    const {
      expires_in_token,
      secret_refresh_token,
      secret_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    //validando senha
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    //gerando jwt
    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    // gerando refresh token
    const refresh_token = sign(
      {
        email,
      },
      secret_refresh_token,
      {
        subject: user.id,
        expiresIn: expires_in_refresh_token,
      }
    );

    const refresh_token_expires_date = this.dateProvider.addTimeToDate(
      expires_refresh_token_days,
      'days'
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
      refresh_token,
    };
  }
}

export { AuthenticateUserUseCase };
