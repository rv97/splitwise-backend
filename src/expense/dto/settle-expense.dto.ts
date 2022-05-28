import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class SettleExpenseDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  expenseId: number;
}
