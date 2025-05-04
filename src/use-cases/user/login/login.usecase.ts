import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { Logger } from 'pino';

import { User } from '../../../entities/user.entity';
import { UnauthorizedError } from '../../../errors/api.error';
import { IUserRepository } from '../../../repositories/user/user.interface';

import { ILoginUseCase } from './login.interface';

export class LoginUseCase implements ILoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private logger: Logger
  ) {}

  private generateToken(user: User): string {
    return sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '1d' }
    );
  }

  async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    this.logger.info('Iniciando processo de login', { email });

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      this.logger.warn('Tentativa de login com email não cadastrado', {
        email,
      });
      throw new UnauthorizedError('AUTH_INVALID_CREDENTIALS');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn('Tentativa de login com senha inválida', { email });
      throw new UnauthorizedError('AUTH_INVALID_CREDENTIALS');
    }

    const token = this.generateToken(user);
    this.logger.info('Login realizado com sucesso', { userId: user.id });

    return { user, token };
  }
}
