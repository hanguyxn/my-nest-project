import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../users/user.entity';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<UserEntity, 'password'> | null> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không đúng');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new BadRequestException('Người dùng không tồn tại');
    }
    return user;
  }
}
