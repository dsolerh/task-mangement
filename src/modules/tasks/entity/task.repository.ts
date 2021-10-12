import { Logger } from '@nestjs/common';
import { SearchDto } from 'src/common/dto/search.dto';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { prepareQuery } from 'src/common/utils/prepare-query.typeorm';
import { User } from 'src/modules/auth/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskStatus } from '../task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async _create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;

    return task;
  }

  async _search(searchDto: SearchDto, user: User): Promise<IPagination<Task>> {
    const query = prepareQuery(this.createQueryBuilder('task'), searchDto);
    query.andWhere('task.userId = :userId', { userId: user.id });
    this.logger.debug(`query to excecute: ${query.getSql()}`);

    try {
      const [tasks, count] = await query.getManyAndCount();
      return {
        meta: {
          total: count,
          count: tasks.length,
        },
        data: tasks,
      };
    } catch (error) {
      this.logger.error(
        `Error throw by user: ${user.username}, DTO: ${JSON.stringify(
          searchDto,
        )}`,
        error.stack,
      );
      throw error;
    }
  }

  async _update(task: Task, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    return task;
  }
}
