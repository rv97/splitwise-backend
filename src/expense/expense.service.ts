import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/services/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async createExpense(createExpenseDto: CreateExpenseDto, email: string) {
    return this.prisma.expense.create({
      data: {
        name: createExpenseDto.name,
        desc: createExpenseDto.desc,
        amount: createExpenseDto.amount,
        createdBy: {
          connect: {
            email,
          },
        },
      },
    });
  }

  // findAll() {
  //   return `This action returns all expense`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} expense`;
  // }

  // update(id: number, updateExpenseDto: UpdateExpenseDto) {
  //   return `This action updates a #${id} expense`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} expense`;
  // }
}
