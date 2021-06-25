import { Repository, getRepository } from 'typeorm';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
