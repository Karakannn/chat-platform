import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { IAuthService } from './auth';
import { CreateUserDto } from './dtos/create-user.dto';
import { IUserService } from 'src/users/user';
import { Services, Routes } from 'src/utils/constants';
import { instanceToPlain } from 'class-transformer';
import { LoginUserDto } from './dtos/user-logiin.dto';
import { LocalAuthGuard } from './utils/guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(
    @Inject(Services.AUTH) private authService: IAuthService,
    @Inject(Services.USERS) private userService: IUserService,
  ) {}

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(createUserDto));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  loginUser(@Body() loginUserDto: LoginUserDto) {}

  @Get('status')
  status() {}

  @Post('logout')
  logout() {}
}
