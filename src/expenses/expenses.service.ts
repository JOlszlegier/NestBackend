import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Expenses from './expenses.entity';
import User from '../users/user.entity';
import { createExpenseDto } from './dto/createExpense.dto';
import { expenseInfoDto } from './dto/expenseInfo.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
  ) {}

  async addExpense(data: createExpenseDto) {
    const userTo = await this.usersRepository.findOne({ email: data.to });
    for (const user in data.eachUserValue) {
      const userFrom = await this.usersRepository.findOne({
        email: data.eachUserValue[user].from,
      });
      await this.expensesRepository.save({
        to: userTo.id,
        description: data.description,
        groupName: data.groupName,
        from: userFrom.id,
        value: data.eachUserValue[user].value,
      });
      userTo.income += data.eachUserValue[user].value;
      userFrom.outcome += data.eachUserValue[user].value;
      await this.usersRepository.update(userTo.id, userTo);
      await this.usersRepository.update(userFrom.id, userFrom);
    }
  }

  async getExpensesPlus(userId: number) {
    const expensesArray: expenseInfoDto[] = [];
    const expenses = await this.expensesRepository.find({ to: userId });
    for (const expense of expenses) {
      expensesArray.push({
        description: expense.description,
        amount: expense.value,
      });
    }
    return { expensesArray };
  }

  async getExpensesMinus(userId: number) {
    const expensesArray: expenseInfoDto[] = [];
    const expenses = await this.expensesRepository.find({ from: userId });
    for (const expense of expenses) {
      expensesArray.push({
        description: expense.description,
        amount: expense.value,
      });
    }
    return { expensesArray };
  }
}
