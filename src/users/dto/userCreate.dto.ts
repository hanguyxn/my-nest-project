import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  password: string;
}
