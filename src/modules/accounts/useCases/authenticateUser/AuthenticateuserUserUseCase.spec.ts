import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { AppError } from '@errors/AppError';

//serviços para testar
let authenticatedUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

//repositório de teste, com as devidas implementações feitas em memória
let userRepositoryInMemory: UsersRepositoryInMemory;

describe('AuthenticatedUser', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticatedUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'nome',
      password: 'senha',
      email: 'email',
      driver_license: 'cnh',
    };
    await createUserUseCase.execute(user);

    const result = await authenticatedUserUseCase.execute({
      email: user.email,
      password: user.password,
    });
    // esperando retorno de token e usuario
    expect(result).toHaveProperty('token');
  });

  it('must be able to return an error after the password is incorrect', () => {
    //esperando erro de autenticação
    expect(async () => {
      const user = {
        name: 'nome',
        password: 'senha',
        email: 'email',
        driver_license: 'cnh',
      };
      await createUserUseCase.execute(user);

      await authenticatedUserUseCase.execute({
        email: user.email,
        password: 'incorrect Password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('must be able to return an error after the email is incorrect', () => {
    //esperando erro de autenticação
    expect(async () => {
      const user = {
        name: 'nome',
        password: 'senha',
        email: 'email',
        driver_license: 'cnh',
      };
      await createUserUseCase.execute(user);

      await authenticatedUserUseCase.execute({
        email: 'email incorrect',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticated an nonexistent user', () => {
    //esperando erro de autenticação
    expect(async () => {
      await authenticatedUserUseCase.execute({
        email: 'email incorrect',
        password: 'password incorrect',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
