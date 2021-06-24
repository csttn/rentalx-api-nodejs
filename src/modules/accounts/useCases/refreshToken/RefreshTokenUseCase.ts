import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { inject, injectable } from 'tsyringe';

import { verify, sign } from 'jsonwebtoken';
import auth from '@config/auth';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    // informações do token e refresh token
    const {
      expires_in_refresh_token,
      secret_refresh_token,
      expires_refresh_token_days,
    } = auth;

    // decodificando token
    const { email, sub } = verify(token, secret_refresh_token) as IPayload;
    const user_id = sub;

    // verificando s eo token existe na base
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    // caso nao exista
    if (!userToken) {
      throw new AppError('Refresh Token does not exists!', 401);
    }

    // se existir, o token é deletado da base

    await this.usersTokensRepository.deleteById(userToken.id);

    // gerando novo refresh token
    const refresh_token = sign(
      {
        email,
      },
      secret_refresh_token,
      {
        subject: user_id,
        expiresIn: expires_in_refresh_token,
      }
    );

    const expires_date = this.dateProvider.addTimeToDate(
      expires_refresh_token_days,
      'days'
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}

export { RefreshTokenUseCase };
