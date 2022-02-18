import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Expenses from './expenses.entity';
import User from '../users/user.entity';
import { CreateExpenseDto } from './dto/createExpense.dto';
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

  async addExpense(data: CreateExpenseDto) {
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
    let expenses: Expenses[];
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
      const userData = await this.usersRepository.findOne({ id: expense.to });
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

  async settleUp(userId: number, expensesIds: number[]) {
    const fromUser = await this.usersRepository.findOne(userId);
    for (const expenseId of expensesIds) {
      const expense = await this.expensesRepository.findOne(expenseId);
      const toUser = await this.usersRepository.findOne(expense.to);
      await this.updateExpense(expense, fromUser, toUser);
    }
  }

  async updateExpense(expense: Expenses, fromUser: User, toUser: User) {
    fromUser.outcome -= expense.value;
    toUser.income -= expense.value;
    await this.usersRepository.update(fromUser.id, fromUser);
    await this.usersRepository.update(toUser.id, toUser);
    await this.expensesRepository.delete(expense.id);
  }

  async balanceCheckInGroup(userId: number, groupName: string) {
    let expensesIncoming: Expenses[];
    let expensesOutcoming: Expenses[];
    let income = 0;
    let outcome = 0;
    if (groupName != 'Dashboard' && groupName != 'Recent Activities') {
      expensesIncoming = await this.expensesRepository.find({
        to: userId,
        groupName: groupName,
      });
      expensesOutcoming = await this.expensesRepository.find({
        from: userId,
        groupName: groupName,
      });
    } else {
      expensesIncoming = await this.expensesRepository.find({
        to: userId,
      });
      expensesOutcoming = await this.expensesRepository.find({
        from: userId,
      });
    }
    for (const expense of expensesIncoming) {
      expense.value;
      income += expense.value;
    }
    for (const expense of expensesOutcoming) {
      expense.value;
      outcome += expense.value;
    }
    return { income, outcome };
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
