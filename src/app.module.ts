import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { UserEntity } from './users/user.entity';
import { RoleModule } from './role/role.module';
import { RoleEntity } from './role/entities/role.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      entities: [UserEntity, RoleEntity],
      database: 'nestjs_typeorm',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {}
