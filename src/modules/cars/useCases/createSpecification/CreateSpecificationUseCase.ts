import { ISpecificationRepository } from '../../repositories/ISpecificationsRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  private specificationRepository: ISpecificationRepository;

  constructor(specificationRepository: ISpecificationRepository) {
    this.specificationRepository = specificationRepository;
  }

  execute({ name, description }: IRequest): void {
    const specificationAlreadyExists = this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error('Category already Exists');
    }

    this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
