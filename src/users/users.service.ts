import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './user';
import { CreateUserDetails } from 'src/utils/types';
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
    const existingUser = await this.userRepository.findOneBy({
      email: userDetails.email,
    });
    console.log('existingUser', existingUser);

    if (existingUser)
      throw new HttpException('User Already Exist', HttpStatus.CONFLICT);

    const password = await hashPassword(userDetails.password);

    const newUser = this.userRepository.create({
      ...userDetails,
      password,
    });

    return this.userRepository.save(newUser);
  }
}
