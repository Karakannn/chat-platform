import { CreateUserDetails } from 'src/utils/types';

export interface IUserService {
  createUser(createUserDetails: CreateUserDetails);
}
