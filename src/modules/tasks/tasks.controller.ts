import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { SearchDto } from 'src/common/dto/search.dto';
import { IPagination } from 'src/common/interfaces/pagination.interface';
import { User } from '../auth/entity/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');

  constructor(private tasksService: TasksService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async getAll(
    @Query() searchDto: SearchDto,
    @GetUser() user: User,
  ): Promise<IPagination<Task>> {
    this.logger.verbose(
      `Getting all tasks for user: "${
        user.username
      }" with search: ${JSON.stringify(searchDto)}`,
    );
    return this.tasksService.getAll(searchDto, user);
  }

  @Get('/:id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `Getting task with id: "${id}" for user: "${user.username}"`,
    );
    return this.tasksService.getById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" create a task with "${JSON.stringify(
        createTaskDto,
      )}"`,
    );
    return this.tasksService.create(createTaskDto, user);
  }

  @Delete('/:id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `Deleting task with id: "${id}" for user: "${user.username}"`,
    );
    return this.tasksService.delete(id, user);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ) {
    this.logger.verbose(
      `Updating task with id: "${id}" for user: "${user.username}"`,
    );
    return this.tasksService.update(id, updateTaskDto, user);
  }
}
