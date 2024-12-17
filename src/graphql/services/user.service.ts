import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserType } from '../types/user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserType[]> {
    const users = await this.userRepository.find({
      where: {
        status: true,
        visibility: true,
      },
      order: {
        created_at: 'DESC',
      },
    });

    // Os campos entre entity e type são compatíveis, então podemos retornar diretamente
    return users;
  }

  async findById(id: number): Promise<UserType> {
    const user = await this.userRepository.findOne({
      where: {
        id,
        status: true,
        visibility: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findAllPaginated(
    skip: number,
    take: number,
  ): Promise<[UserType[], number]> {
    return this.userRepository.findAndCount({
      where: {
        status: true,
        visibility: true,
      },
      order: { created_at: 'DESC' },
      skip,
      take,
    });
  }
}
