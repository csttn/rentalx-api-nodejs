import { inject, injectable } from 'tsyringe';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    return await this.specificationsRepository.list();
  }
}

export { ListSpecificationsUseCase };
