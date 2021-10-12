import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchDto } from 'src/common/dto/search.dto';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { User } from '../auth/entity/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { TaskRepository } from './entity/task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private _taskRepo: TaskRepository,
  ) {}

  async getAll(searchDto: SearchDto, user: User): Promise<IPagination<Task>> {
    return this._taskRepo._search(searchDto, user);
  }

  async getById(id: number, user: User): Promise<Task> {
    const task = await this._taskRepo.findOne({
      where: { id, userId: user.id },
    });
    if (!task) throw new NotFoundException(`Task with Id "${id}" not found`);
    return task;
  }

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this._taskRepo._create(createTaskDto, user);
  }

  async delete(id: number, user: User): Promise<void> {
    const { affected } = await this._taskRepo.delete({ id, userId: user.id });
    if (!affected)
      throw new NotFoundException(`Task with Id "${id}" not found`);
  }

  async update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    user: User,
  ): Promise<Task> {
    const task = await this.getById(id, user);
    return this._taskRepo._update(task, updateTaskDto);
  }
}
