import { UserCredentialDetails } from 'src/utils/types';

export interface IAuthService {
  validateUser(userCredentials: UserCredentialDetails);
}
