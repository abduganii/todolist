import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { List } from "./list.entity";
import { ListServce } from "./list.service";
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateListDto, UpdateListDto } from "./dto";
import { Route } from "src/infra/shared/decorators/route.decorator";
import { PaginationDto } from "src/infra/shared/dto";

import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

@ApiTags('List')
@Controller('list')
export class ListController {
    constructor(private readonly listService: ListServce) { }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns current list' })
  @ApiOkResponse({
    description: 'The list was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  // async getData(@Route() route: string, @Query() query: PaginationDto) {
  //   return await this.listService.findAll({ ...query, route });
  // }
  
  async getData() {
    return await this.listService.findAll();
  }
  

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new list' })
  @ApiCreatedResponse({
    description: 'The list was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async createData(@Body() listData: CreateListDto): Promise<List> {
      return await this.listService.create(listData)
  }  

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating list' })
  @ApiOkResponse({
    description: 'List was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() listData: UpdateListDto,
    @Param('id') id: string,
  ): Promise<UpdateResult | List> {
    return await this.listService.change(listData, id);
  }
  
  @Put('/isChecked/:id')
  @ApiOperation({ summary: 'Method: updating checked' })
  @ApiOkResponse({
    description: 'List was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeIsChecked(
    @Body() listData: { isChecked: boolean },
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.listService.changeIsCkecked(listData.isChecked, id);
  }

    @Delete('/:id')
    @ApiOperation({ summary: 'Method: deleting list' })
    @ApiOkResponse({
      description: 'List was deleted',
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteData(@Param('id') id: string): Promise<DeleteResult> {
      return await this.listService.deleteOne(id);
    }
}