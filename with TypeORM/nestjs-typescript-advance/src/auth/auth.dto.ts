import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDTO {

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {

  @ApiProperty()
  @MinLength(6)
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

}
