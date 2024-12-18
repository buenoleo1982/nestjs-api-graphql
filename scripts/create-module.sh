#!/bin/bash

# Verifica se foi fornecido um nome para o módulo
if [ -z "$1" ]; then
    echo "Por favor, forneça um nome para o módulo"
    echo "Uso: pnpm run create:module nome-do-modulo"
    exit 1
fi

# Converte o nome do módulo para lowercase
MODULE_NAME=$(echo $1 | tr '[:upper:]' '[:lower:]')

# Define o diretório base
BASE_DIR="src/graphql/modules/$MODULE_NAME"

# Cria as pastas necessárias
mkdir -p "$BASE_DIR"/{types,entities,resolvers,services}

# Cria os arquivos básicos
touch "$BASE_DIR/types/$MODULE_NAME.type.ts"
touch "$BASE_DIR/types/$MODULE_NAME.input.ts"
touch "$BASE_DIR/types/$MODULE_NAME.args.ts"
touch "$BASE_DIR/entities/$MODULE_NAME.entity.ts"
touch "$BASE_DIR/resolvers/$MODULE_NAME.resolver.ts"
touch "$BASE_DIR/services/$MODULE_NAME.service.ts"
touch "$BASE_DIR/$MODULE_NAME.module.ts"

# Adiciona conteúdo básico aos arquivos
cat > "$BASE_DIR/types/$MODULE_NAME.type.ts" << EOF
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ${MODULE_NAME^} {
  @Field(() => ID)
  id: number;
}
EOF

cat > "$BASE_DIR/types/$MODULE_NAME.input.ts" << EOF
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class Create${MODULE_NAME^}Input {
}
EOF

cat > "$BASE_DIR/entities/$MODULE_NAME.entity.ts" << EOF
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ${MODULE_NAME^} {
  @PrimaryGeneratedColumn()
  id: number;
}
EOF

cat > "$BASE_DIR/resolvers/$MODULE_NAME.resolver.ts" << EOF
import { Resolver, Query } from '@nestjs/graphql';
import { ${MODULE_NAME^} } from '../types/$MODULE_NAME.type';
import { ${MODULE_NAME^}Service } from '../services/$MODULE_NAME.service';

@Resolver(() => ${MODULE_NAME^})
export class ${MODULE_NAME^}Resolver {
  constructor(private readonly ${MODULE_NAME}Service: ${MODULE_NAME^}Service) {}

  @Query(() => [${MODULE_NAME^}])
  async ${MODULE_NAME}s(): Promise<${MODULE_NAME^}[]> {
    return this.${MODULE_NAME}Service.findAll();
  }
}
EOF

cat > "$BASE_DIR/services/$MODULE_NAME.service.ts" << EOF
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ${MODULE_NAME^} } from '../entities/$MODULE_NAME.entity';

@Injectable()
export class ${MODULE_NAME^}Service {
  constructor(
    @InjectRepository(${MODULE_NAME^})
    private readonly ${MODULE_NAME}Repository: Repository<${MODULE_NAME^}>,
  ) {}

  async findAll(): Promise<${MODULE_NAME^}[]> {
    return this.${MODULE_NAME}Repository.find();
  }
}
EOF

cat > "$BASE_DIR/$MODULE_NAME.module.ts" << EOF
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ${MODULE_NAME^} } from './entities/$MODULE_NAME.entity';
import { ${MODULE_NAME^}Resolver } from './resolvers/$MODULE_NAME.resolver';
import { ${MODULE_NAME^}Service } from './services/$MODULE_NAME.service';

@Module({
  imports: [TypeOrmModule.forFeature([${MODULE_NAME^}])],
  providers: [${MODULE_NAME^}Resolver, ${MODULE_NAME^}Service],
  exports: [${MODULE_NAME^}Service],
})
export class ${MODULE_NAME^}Module {}
EOF

echo "Módulo $MODULE_NAME criado com sucesso!"
