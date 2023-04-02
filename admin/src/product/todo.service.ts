import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private readonly todoRepository: Repository<Todo>) {}

  findAll() {
    return this.todoRepository.find();
  }

  create(todo: Omit<Todo, 'id' | 'completed'>): Promise<Todo> {
    return this.todoRepository.save({ ...todo, date: new Date() });
  }

  async update(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (todo) {
      // set updated to opposite and save it to database
      todo.completed = !todo.completed;
      await this.todoRepository.save(todo);
    }

    return todo;
  }

  delete(id: number) {
    return this.todoRepository.delete(id);
  }
}
