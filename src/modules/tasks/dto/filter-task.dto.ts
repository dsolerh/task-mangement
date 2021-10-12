import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class FilterTaskDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsNotEmpty()
  filter: any;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.INPROGRESS, TaskStatus.CLOSED])
  status: TaskStatus;
}
