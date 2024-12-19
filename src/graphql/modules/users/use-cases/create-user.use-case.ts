import { CreateUserInput } from '../types/create-user.input';
import { Injectable } from '@nestjs/common';
import { Logger } from '@/logger/logger.service';
import { UserService } from '../services/user.service';
import { UserType } from '../types/user.type';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userService: UserService,
    private readonly logger: Logger,
  ) {}

  async execute(data: CreateUserInput): Promise<UserType> {
    this.logger.log('Iniciando criação de usuário', 'CreateUserUseCase');
    this.logger.debug(
      `Dados recebidos: ${JSON.stringify({ ...data, password: '[REDACTED]' })}`,
      'CreateUserUseCase',
    );

    const user = await this.userService.create(data);

    this.logger.log(
      `Usuário criado com sucesso: ID ${user.id}`,
      'CreateUserUseCase',
    );

    return user;
  }
}
