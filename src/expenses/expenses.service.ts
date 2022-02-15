import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Expenses from './expenses.entity';
import User from '../users/user.entity';
import { createExpenseDto } from './dto/createExpense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Expenses)
    private expensesRepository: Repository<Expenses>,
  ) {}

  async addExpense(data: createExpenseDto) {
    const userTo = await this.usersRepository.findOne(data.to);
    for (const user in data.eachUserValue) {
      const userFrom = await this.usersRepository.findOne(
        data.eachUserValue[user].from,
      );
      await this.expensesRepository.save({
        to: data.to,
        description: data.description,
        groupName: data.groupName,
        from: userFrom.id,
        value: data.eachUserValue[user].value,
      });
    }
  }
}
