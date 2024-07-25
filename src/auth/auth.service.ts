import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth';

@Injectable()
export class AuthService implements IAuthService {
    validateUser() {
        return 'User is valid';
    }
}
