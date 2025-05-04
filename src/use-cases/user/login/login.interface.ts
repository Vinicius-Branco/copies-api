import { User } from '../../../entities/user.entity';

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<{ user: User; token: string }>;
}
