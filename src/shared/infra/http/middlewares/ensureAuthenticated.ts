import { Response, Request, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '@errors/AppError';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';

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

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  //trasnformando string em array, separando posiçĩoes por espacõs na string
  //selecionando a segunda posição onde se encontra o token, (Baerer "Token")
  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, process.env.SECRET_JWT) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

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
