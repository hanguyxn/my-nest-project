import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserCreateDTO } from './dto/userCreate.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserUpdateDto } from './dto/userUpdate.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(body: UserCreateDTO) {
    const hashed = await bcrypt.hash(body.password, 10);
    const newUser = this.userRepository.create({ ...body, password: hashed });
    return this.userRepository.save(newUser);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOneBy({ id });
  }

  async findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  async update(id: number, body: UserUpdateDto) {
    await this.userRepository.update(id, body);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
