import { Request, Response, NextFunction } from 'express';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@errors/AppError';

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const userAlreadyExists = await usersRepository.findById(id);

  if (!userAlreadyExists) {
    throw new AppError('User not exists');
  }

  if (!userAlreadyExists.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
