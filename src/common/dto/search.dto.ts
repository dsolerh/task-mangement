import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchDto {
  @IsOptional()
  @IsNotEmpty()
  filter: any;

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  attributes: any[];
}
