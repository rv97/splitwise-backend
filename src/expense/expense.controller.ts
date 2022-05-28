import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    return this.expenseService.createExpense(createExpenseDto, req.user.email);
  }

  // @Get()
  // findAll() {
  //   return this.expenseService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.expenseService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
  //   return this.expenseService.update(+id, updateExpenseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.expenseService.remove(+id);
  // }
}
