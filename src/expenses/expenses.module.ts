import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Expenses from './expenses.entity';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Expenses])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
  exports: [
    ExpensesService,
    ExpensesModule,
    TypeOrmModule.forFeature([Expenses]),
  ],
})
export class ExpensesModule {}
