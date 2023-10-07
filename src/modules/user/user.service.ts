import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, FindOptionsWhere } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { hashPassword } from 'src/infra/helpers';

@Injectable()
export class UserServce {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(
    options: IPaginationOptions,
    where?: FindOptionsWhere<User>,
  ): Promise<Pagination<User>> {
    return paginate<User>(this.userRepository, options);
  }

  async getById(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getByName(name: string) {
    return await this.userRepository.findOne({ where: { name } });
  }

  async create(data: CreateUserDto) {
    data.password = await hashPassword(data.password);
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async change(value: UpdateUserDto, id: string) {
    const response = await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(value as unknown as User)
      .where('id = :id', { id })
      .execute();

    return response;
  }

  async deleteOne(id: string) {
    const response = await this.userRepository.delete(id);
    return response;
  }
}
