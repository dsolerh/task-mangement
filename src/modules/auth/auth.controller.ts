import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signup(@Body() signupDto: SignUpDto): Promise<void> {
    return this.authService.signup(signupDto);
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signin(@Body() signinDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signin(signinDto);
  }
}
