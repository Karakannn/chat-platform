import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserDetails, FindUserParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { hashPassword } from 'src/utils/helpers';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDetails: CreateUserDetails) {
    console.log('userDetails', userDetails);

    const existingUser = await this.userRepository.findOneBy({
      email: userDetails.email,
    });

    if (existingUser)
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);

    const password = await hashPassword(userDetails.password);

    const newUser = this.userRepository.create({
      ...userDetails,
      password,
    });

    return this.userRepository.save(newUser);
  }

  async findUser(findUserParams: FindUserParams): Promise<User> {
    const user = await this.userRepository.findOneBy({
      email: findUserParams.email,
    });

    return user;
  }
}
