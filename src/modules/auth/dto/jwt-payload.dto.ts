import { IsNumber, IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { ReturnUserDto } from './index';

class JwtPayloadDto {
  @ApiProperty({
    description: `User id`,
    example: 'sdawdadewsdewd2132seewq',
  })
  @IsNotEmpty()
  @IsString()
  sub: string;

  constructor(user: ReturnUserDto) {
    this.sub = user.id;
  }
}

export default JwtPayloadDto;
