import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  desc?: string;

  @IsPositive()
  @IsNumber()
  @ApiProperty()
  amount: number;

  @ArrayNotEmpty()
  @ArrayUnique()
  @ApiProperty()
  connectedUsers: string[];
}
