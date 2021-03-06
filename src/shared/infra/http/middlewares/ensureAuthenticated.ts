import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { UsersTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokensRepository';
import auth from '@config/auth';

interface IPayload {
  iat: number;
  exp: number;
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const userTokenRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  //trasnformando string em array, separando posiçĩoes por espacõs na string
  //selecionando a segunda posição onde se encontra o token, (Baerer "Token")
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token
    ) as IPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError('User not Exists', 401);
    }

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}
