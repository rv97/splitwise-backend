import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { RenderModule } from 'nest-next';
import next from 'next';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ExpenseModule,
    RenderModule.forRootAsync(
      next({ dev: process.env.NODE_ENV == 'development' }),
      /* null means that nest-next 
            should look for pages in root dir */
      { viewsDir: null },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
