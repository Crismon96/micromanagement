import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post()
  create(@Body() todo: Omit<Todo, 'id'>): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.todoService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: number): Promise<Todo> {
    return this.todoService.update(id);
  }
}
