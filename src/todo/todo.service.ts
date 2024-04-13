import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { todo } from 'node:test';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private TodoRepository: Repository<Todo>,
    private UserService: UserService,
    private notificationService:NotificationsService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.UserService.findUserById(userId);
   await this.notificationService.create(`${todo.title} posted`, userId)
    return this.TodoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.TodoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }
  findAllTodoByUserCompleted(userId: number) {
    return this.TodoRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(TodoId: number,) {
    return  this.TodoRepository.update(TodoId,{completed:true})
  }

  remove(TodoId: number) {
    return this.TodoRepository.delete(TodoId)
  }
}
