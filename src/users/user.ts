import { User } from 'src/utils/typeorm/entities/User';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';

export interface IUserService {
  createUser(createUserDetails: CreateUserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
}
