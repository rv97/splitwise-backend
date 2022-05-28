import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  desc?: string;

  @ApiProperty()
  amount: number;
}
