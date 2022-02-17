import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Expenses from './expenses.entity';
import User from '../users/user.entity';
import { createExpenseDto } from './dto/createExpense.dto';
import { expenseListInfoDto } from './dto/expenseInfo.dto';
import { settleUpInfoDto } from './dto/settleUpInfo.dto';

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
    const expensesArray: expenseListInfoDto[] = [];

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
    const expensesArray: expenseListInfoDto[] = [];
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

  async getExpensesInfo(userId: number, groupName: string) {
    let expenses: Expenses[] = [];
    if (groupName != 'Dashboard' && groupName != 'Recent Activities') {
      expenses = await this.expensesRepository.find({
        from: userId,
        groupName: groupName,
      });
    } else {
      expenses = await this.expensesRepository.find({ from: userId });
    }

    const expensesArray: settleUpInfoDto[] = [];
    const expensesInfoResponse: settleUpInfoDto[] = [];
    const expensesId: number[] = [];
    const holder = {};
    for (const expense of expenses) {
      const userData = await this.usersRepository.findOne({ id: expense.from });
      expensesArray.push({
        name: userData.name,
        amount: expense.value,
      });
      expensesId.push(expense.id);
    }

    expensesArray.forEach((d) => {
      if (holder.hasOwnProperty(d.name)) {
        holder[d.name] = holder[d.name] + d.amount;
      } else {
        holder[d.name] = d.amount;
      }
    });

    for (const prop in holder) {
      expensesInfoResponse.push({ name: prop, amount: holder[prop] });
    }

    return { expensesInfoResponse, expensesId };
  }

  extractInfoFromExpenses(
    expenses: Expenses[],
    expensesArray: expenseListInfoDto[],
  ) {
    for (const expense of expenses) {
      expensesArray.push({
        description: expense.description,
        amount: expense.value,
      });
    }
  }
}
