import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { UserModule } from 'src/server/user/user.module';
import { AuthModule } from 'src/server/auth/auth.module';
import { PrismaService } from 'src/server/services/prisma.service';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [ExpenseController],
  providers: [ExpenseService, PrismaService],
})
export class ExpenseModule {}
