import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { EntityRepository, QueryFailedError, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto } from '../dto/sign-up.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { JwtPayload } from '../../../common/interfaces/jwt-payload.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signupDto: SignUpDto): Promise<void> {
    const { email, password } = signupDto;

    const user = new User();
    user.email = email;
    user.username = email;
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(password, user.salt);
    try {
      await user.save();
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async signin(signinDto: SignInDto): Promise<JwtPayload> {
    const { username, password } = signinDto;
    const user = await this.findOne({ username });

    if (await this.validUser(user, password)) {
      return {
        username: user.username,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  private async validUser(user: User, password): Promise<boolean> {
    if (user) {
      const hashPassword = await bcrypt.hash(password, user.salt);
      return hashPassword === user.password;
    } else {
      return false;
    }
  }
}
