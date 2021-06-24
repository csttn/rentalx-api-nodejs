import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase';

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
    const user: ICreateUserDTO = {
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

  it('must be able to return an error after the password is incorrect', async () => {
    //esperando erro de autenticação
    const user: ICreateUserDTO = {
      name: 'nome',
      password: 'senha',
      email: 'email',
      driver_license: 'cnh',
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticatedUserUseCase.execute({
        email: user.email,
        password: 'incorrect Password',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('must be able to return an error after the email is incorrect', async () => {
    //esperando erro de autenticação
    const user: ICreateUserDTO = {
      name: 'nome',
      password: 'senha',
      email: 'email',
      driver_license: 'cnh',
    };
    await createUserUseCase.execute(user);

    await expect(
      authenticatedUserUseCase.execute({
        email: 'email incorrect',
        password: user.password,
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });

  it('should be able to authenticated an nonexistent user', async () => {
    //esperando erro de autenticação
    await expect(
      authenticatedUserUseCase.execute({
        email: 'email incorrect',
        password: 'password incorrect',
      })
    ).rejects.toEqual(new AppError('Email or password incorrect!'));
  });
});
