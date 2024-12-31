import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthDto } from './authDto';
import { PhoneAuthPipe } from './customPipe/phoneAuthPipe';

@Controller('auth')
export class AuthController {
  @Post('register')
  @UsePipes(PhoneAuthPipe)
  registerUser(@Body() userData: AuthDto) {
    return {
      data: userData,
    };
  }
}
