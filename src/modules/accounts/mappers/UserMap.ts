import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUserResponseDTO } from '../dtos/IUserResponseDTO';

import { classToClass } from 'class-transformer';
 


class UserMap {
  static toDto({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = classToClass({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap };
