import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.CLOSED])
  status: TaskStatus;
}
