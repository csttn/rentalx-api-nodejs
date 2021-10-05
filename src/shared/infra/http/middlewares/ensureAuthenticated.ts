import auth from '@config/auth';
import { AppError } from '@errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    const { sub: user_id } = verify(
      token,
      auth.secret_token
    ) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch (error) {
    throw new AppError('Invalid Token', 401);
  }
}
