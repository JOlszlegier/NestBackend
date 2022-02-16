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

  async getExpensesPlus(userId: number, groupName: string) {
    const expensesArray: expenseInfoDto[] = [];

    if (groupName != 'Dashboard' && groupName != 'Recent Activities') {
      const expenses = await this.expensesRepository.find({
        to: userId,
        groupName: groupName,
      });
      this.extractInfoFromExpenses(expenses, expensesArray);
    } else {
      const expenses = await this.expensesRepository.find({ to: userId });
      this.extractInfoFromExpenses(expenses, expensesArray);
    }
    return { expensesArray };
  }

  async getExpensesMinus(userId: number, groupName: string) {
    const expensesArray: expenseInfoDto[] = [];
    if (groupName != 'Dashboard' && groupName != 'Recent Activities') {
      const expenses = await this.expensesRepository.find({
        from: userId,
        groupName: groupName,
      });
      this.extractInfoFromExpenses(expenses, expensesArray);
    } else {
      const expenses = await this.expensesRepository.find({ from: userId });
      this.extractInfoFromExpenses(expenses, expensesArray);
    }

    return { expensesArray };
  }

  extractInfoFromExpenses(
    expenses: Expenses[],
    expensesArray: expenseInfoDto[],
  ) {
    for (const expense of expenses) {
      expensesArray.push({
        description: expense.description,
        amount: expense.value,
      });
    }
  }
}
