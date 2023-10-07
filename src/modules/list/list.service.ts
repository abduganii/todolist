import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, FindOptionsWhere } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { CreateListDto, UpdateListDto } from './dto';
import { List } from './list.entity';

@Injectable()
export class ListServce {
  constructor(
    @InjectRepository(List)
    private readonly listRepository: Repository<List>,
  ) {}

  async findAll(
    options: IPaginationOptions,
    where?: FindOptionsWhere<List>,
  ): Promise<Pagination<List>> {
    return paginate<List>(this.listRepository, options, {
      relations: {
        user: true,
      },
    });
  }

  async getByUserId(id: string) {
    const articles = await this.listRepository.find({
      where: {
        user: { id },
      },
    });

    return articles;
  }

  async getById(id: string) {
    return await this.listRepository.findOne({ where: { id } });
  }

  async create(values: CreateListDto, userId: string) {
    const response = await this.listRepository
      .createQueryBuilder()
      .insert()
      .into(List)
      .values({ ...values, user: userId } as unknown as List)
      .returning('id')
      .execute();

    return response;
  }

  async change(value: UpdateListDto, id: string) {
    const response = await this.listRepository
      .createQueryBuilder()
      .update(List)
      .set(value as unknown as List)
      .where('id = :id', { id })
      .execute();

    return response;
  }
  async changeIsCkecked(isChecked: boolean, id: string) {
    const IsChecked = await this.getById(id);
    const data = await this.listRepository.update(id, {
      isChecked: isChecked || !IsChecked?.isChecked,
    });
    return data;
  }
  async deleteOne(id: string) {
    const response = await this.listRepository.delete(id);
    return response;
  }
}
