import { hash } from 'bcryptjs';
import { Logger } from 'pino';

import { User } from '../../../entities/user.entity';
import { UserAlreadyExistsError } from '../../../errors/api.error';
import { IUserRepository } from '../../../repositories/user/user.interface';

import { ICreateUserUseCase } from './create.interface';

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private logger: Logger
  ) {}

  async execute(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    this.logger.info('Iniciando criação de usuário', { email: userData.email });

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      this.logger.warn('Tentativa de criar usuário com email já existente', {
        email: userData.email,
      });
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await hash(userData.password, 10);
    const user = new User();
    Object.assign(user, {
      ...userData,
      password: hashedPassword,
    });

    const createdUser = await this.userRepository.create(user);
    this.logger.info('Usuário criado com sucesso', { userId: createdUser.id });
    return createdUser;
  }
}
