import { User } from '../../../entities/user.entity';

export interface IGetUserByIdUseCase {
  execute(id: string): Promise<User>;
}
