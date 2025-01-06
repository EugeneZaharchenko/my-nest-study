import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { User, UserService } from '../../services/user/user.service';
import { UserDataTransformInterceptor } from 'src/interceptors/user-data-transform/user-data-transform.interceptor';
import { AuthInterceptor } from 'src/interceptors/auth/auth.interceptor';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseInterceptors(AuthInterceptor, UserDataTransformInterceptor)
  getUser(@Param('id') id: string) {
    const user = this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post('create')
  @UseInterceptors(UserDataTransformInterceptor)
  createUser(@Body() user: User) {
    const userId = this.userService.addUser(user);
    return { id: userId, message: 'User created successfully' };
  }
}
