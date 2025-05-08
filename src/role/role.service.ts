import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepo: Repository<RoleEntity>,
  ) {}

  createRole(createRoleDto: CreateRoleDto) {
    return this.roleRepo.save(createRoleDto);
  }

  getAllRole() {
    return this.roleRepo.find();
  }

  getRoleById(id: number) {
    return this.roleRepo.findOneBy({ id });
  }

  updateRole(id: number, body: UpdateRoleDto) {
    return this.roleRepo.update(id, body);
  }

  deleteRole(id: number) {
    return this.roleRepo.delete(id);
  }
}
