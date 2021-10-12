import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from './entity/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private _userRepo: UserRepository,
    private _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignUpDto): Promise<void> {
    return this._userRepo.signup(signupDto);
  }

  async signin(signinDto: SignInDto): Promise<{ accessToken: string }> {
    const payload = await this._userRepo.signin(signinDto);

    const _token = await this._jwtService.sign(payload);

    return {
      accessToken: _token,
    };
  }
}
