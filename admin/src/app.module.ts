import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './product/todo.controller';
import { Todo } from './product/todo.entity';
import { TodoService } from './product/todo.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql',
      port: 3306,
      username: 'root',
      password: 'pLNNkG2ihRNUtTtuzgTFdpdLDNsob33UOFaKDIEk2eOJjNft',
      database: 'nest_admin',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([Todo]),
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class AppModule {}
