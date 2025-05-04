import { getRepository } from 'typeorm';

import { User } from '../../entities/user.entity';
import { UserNotFoundError } from '../../errors/api.error';

import { IUserRepository } from './user.interface';

export class UserRepository implements IUserRepository {
  private repository = getRepository(User);

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    Object.assign(user, userData);
    return this.repository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }
    await this.repository.remove(user);
  }
}
