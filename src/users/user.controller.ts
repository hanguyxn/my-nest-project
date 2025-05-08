import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserCreateDTO } from './dto/userCreate.dto';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userCreateDTO: UserCreateDTO) {
    return this.userService.createUser(userCreateDTO);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
    return await this.userService.update(+id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.userService.remove(+id);
  }
}
