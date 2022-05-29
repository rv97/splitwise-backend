import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/server/services/prisma.service';
import { IStatsResult } from 'src/shared/types/IStatsResult';
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

  async getStats(email: string) {
    const result: IStatsResult = {
      owedByMe: 0.0,
      owedToMe: 0.0,
    };
    result.owedByMe = (
      await this.prisma.split.findMany({
        where: {
          user: {
            email,
          },
        },
      })
    ).reduce((currAmt, oSplit) => {
      return currAmt + oSplit.shareAmount;
    }, 0.0);

    result.owedToMe = (
      await this.prisma.expense.findMany({
        where: {
          createdBy: {
            email,
          },
        },
        include: {
          splits: {
            where: {
              isSettled: false,
            },
          },
        },
      })
    )
      .map((x) => x.splits)
      .flat()
      .reduce((currAmt, oSplit) => {
        return currAmt + oSplit.shareAmount;
      }, 0.0);
    return result;
  }

  async getExpenseList(email: string) {
    return this.prisma.expense.findMany({
      where: {
        createdBy: {
          email,
        },
      },
    });
  }

  async getExpense(expenseId: number) {
    return this.prisma.expense.findUnique({
      where: {
        id: expenseId,
      },
      include: {
        splits: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async getOwedByMe(email: string) {
    return this.prisma.split.findMany({
      where: {
        user: {
          email,
        },
      },
      include: {
        expense: {
          select: {
            createdBy: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }
}
