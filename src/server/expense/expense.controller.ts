import {
  Controller,
  Post,
  Body,
  Patch,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SettleExpenseDto } from './dto/settle-expense.dto';

@ApiBearerAuth()
@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @UseGuards(JwtGuard)
  @Post()
  createExpense(@Body() createExpenseDto: CreateExpenseDto, @Request() req) {
    return this.expenseService.createExpense(createExpenseDto, req.user.email);
  }

  @UseGuards(JwtGuard)
  @Get('stats')
  getStats(@Request() req) {
    return this.expenseService.getStats(req.user.email);
  }

  @UseGuards(JwtGuard)
  @Patch('settleExense')
  settleExpense(@Body() settleExpenseDto: SettleExpenseDto, @Request() req) {
    return this.expenseService.settleExpense(settleExpenseDto, req.user.email);
  }

  @UseGuards(JwtGuard)
  @Patch('cancelSettleExpense')
  cancelSettleExpense(
    @Body() settleExpenseDto: SettleExpenseDto,
    @Request() req,
  ) {
    return this.expenseService.cancelSettleExpense(
      settleExpenseDto,
      req.user.email,
    );
  }

  @UseGuards(JwtGuard)
  @Get('all')
  getExpenseList(@Request() req) {
    return this.expenseService.getExpenseList(req.user.email);
  }

  @UseGuards(JwtGuard)
  @Get('mydebt')
  getOwedByMe(@Request() req) {
    return this.expenseService.getOwedByMe(req.user.email);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getExpense(@Param('id', ParseIntPipe) id: number) {
    return this.expenseService.getExpense(id);
  }
}
