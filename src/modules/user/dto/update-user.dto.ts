import {
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
class UpdateUserDto {
  
  @ApiProperty({
    description: `Name`,
    example: 'John Doe',
  })

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  name: string;

  @ApiProperty({
    description: `Password`,
    example: 'dsk_45llsd',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  password: string;

}

export default UpdateUserDto;
