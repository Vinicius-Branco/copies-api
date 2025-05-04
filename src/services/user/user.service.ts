import { Logger } from 'pino';

import { createRequestLogger } from '../../config/logger.config';
import { User } from '../../entities/user.entity';
import { IUserRepository } from '../../repositories/user/user.interface';
import { CreateUserUseCase } from '../../use-cases/user/create/create.usecase';
import { GetUserByIdUseCase } from '../../use-cases/user/getById/getById.usecase';
import { LoginUseCase } from '../../use-cases/user/login/login.usecase';

import { IUserService } from './user.interface';

export class UserService implements IUserService {
  private createUserUseCase: CreateUserUseCase;
  private loginUseCase: LoginUseCase;
  private getUserByIdUseCase: GetUserByIdUseCase;
  private logger: Logger;

  constructor(userRepository: IUserRepository, logger?: Logger) {
    this.logger = logger || createRequestLogger('user-service');

    this.createUserUseCase = new CreateUserUseCase(userRepository, this.logger);
    this.loginUseCase = new LoginUseCase(userRepository, this.logger);
    this.getUserByIdUseCase = new GetUserByIdUseCase(userRepository, this.logger);
  }

  async createUser(userData: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    this.logger.info('Iniciando criação de usuário', { email: userData.email });
    return this.createUserUseCase.execute(userData);
  }

  async getUserById(id: string): Promise<User> {
    this.logger.info('Buscando usuário por ID', { userId: id });
    return this.getUserByIdUseCase.execute(id);
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    this.logger.info('Iniciando processo de login', { email });
    return this.loginUseCase.execute(email, password);
  }
}
