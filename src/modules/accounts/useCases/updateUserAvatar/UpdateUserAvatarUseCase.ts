import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    //buscando usuario no repositorio
    const user = await this.usersRepository.findById(user_id);
    
    //deletando avatar que faz referencia a outro avatar (caso exista)
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar');
    }

    await this.storageProvider.save(avatar_file, 'avatar');

    //atribuindo referencia da imagem armazenada no localStorage
    user.avatar = avatar_file;
    // atualizando usuario
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
