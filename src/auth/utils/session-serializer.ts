import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { Services } from 'src/utils/constants';
import { User } from 'src/utils/typeorm/entities/User';
import { IAuthService } from '../auth';
import { IUserService } from 'src/users/user';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.AUTH) private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user);
  }

  async deserializeUser(user: User, done: Function) {
    const userDb = await this.userService.findUser({ id: user.id });
    return userDb ? done(null, userDb) : done(null, null);
  }
}
