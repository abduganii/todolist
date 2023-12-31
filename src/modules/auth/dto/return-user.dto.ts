import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/user.entity';

class ReturnUser {
  @ApiProperty({
    description: `Name`,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: `User id`,
    example: 'sdawdadewsdewd2132seewq',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
  }
}

export default ReturnUser;
