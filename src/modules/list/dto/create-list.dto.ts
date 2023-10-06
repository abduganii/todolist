import {
  IsNotEmpty,
  IsString,
  MaxLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateListDto {
  @ApiProperty({
    description: `Text`,
    example: 'Todo list 1',
  })

  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  text: string;


}

export default CreateListDto;
