import { User } from '../../entities/user.entity';
import { CustomRequest } from '../../interfaces/express.interface';

export interface IUserController {
  createUser(userData: Partial<User>, req: CustomRequest): Promise<User>;
  getUserById(id: string, req: CustomRequest): Promise<User>;
  login(
    credentials: { email: string; password: string },
    req: CustomRequest
  ): Promise<{ user: User; token: string }>;
}
