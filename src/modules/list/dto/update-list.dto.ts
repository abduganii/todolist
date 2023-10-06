import {
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
class UpdateListDto {
  
  @ApiProperty({
    description: `Text`,
    example: 'Todo list 1',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
 
  text: string;

}

export default UpdateListDto;
