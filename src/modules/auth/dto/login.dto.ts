import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

class LoginDto {
  @ApiProperty({
    description: `Name`,
    example: 'ali',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: `User's password`,
    example: 'ali',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export default LoginDto;
