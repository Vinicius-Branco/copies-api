import { User } from '../../../entities/user.entity';

export interface ICreateUserUseCase {
  execute(userData: Partial<User>): Promise<User>;
}
