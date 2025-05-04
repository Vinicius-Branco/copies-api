import { Logger } from 'pino';

import { User } from '../../../entities/user.entity';
import { UserNotFoundError } from '../../../errors/api.error';
import { IUserRepository } from '../../../repositories/user/user.interface';


import { IGetUserByIdUseCase } from './getById.interface';

export class GetUserByIdUseCase implements IGetUserByIdUseCase {
  constructor(
    private userRepository: IUserRepository,
    private logger: Logger
  ) {}

  async execute(id: string): Promise<User> {
    this.logger.info('Buscando usuário por ID', { userId: id });

    const user = await this.userRepository.findById(id);
    if (!user) {
      this.logger.warn('Usuário não encontrado', { userId: id });
      throw new UserNotFoundError();
    }

    this.logger.info('Usuário encontrado com sucesso', { userId: id });
    return user;
  }
}
