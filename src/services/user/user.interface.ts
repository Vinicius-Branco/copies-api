import { User } from '../../entities/user.entity';

export interface IUserService {
  createUser(userData: Partial<User>): Promise<User>;
  getUserById(id: string): Promise<User>;
  login(email: string, password: string): Promise<{ user: User; token: string }>;
}
