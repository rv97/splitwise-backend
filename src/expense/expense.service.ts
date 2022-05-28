import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { SettleExpenseDto } from './dto/settle-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}
  async createExpense(createExpenseDto: CreateExpenseDto, email: string) {
    const perUserAmount =
      createExpenseDto.amount / (createExpenseDto.connectedUsers.length + 1);
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
        splits: {
          create: createExpenseDto.connectedUsers.map((connectedUserEmail) => {
            return {
              user: {
                connect: {
                  email: connectedUserEmail,
                },
              },
              isSettled: false,
              shareAmount: perUserAmount,
              sharePercentage: (perUserAmount / createExpenseDto.amount) * 100,
            };
          }),
        },
      },
    });
  }

  async settleExpense(settleExpenseDto: SettleExpenseDto, email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return this.prisma.split.update({
      where: {
        expenseId_userId: {
          expenseId: settleExpenseDto.expenseId,
          userId: user.id,
        },
      },
      data: {
        isSettled: true,
      },
    });
  }

  async cancelSettleExpense(settleExpenseDto: SettleExpenseDto, email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return this.prisma.split.update({
      where: {
        expenseId_userId: {
          expenseId: settleExpenseDto.expenseId,
          userId: user.id,
        },
      },
      data: {
        isSettled: false,
      },
    });
  }
}
