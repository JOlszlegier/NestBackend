import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Expenses from './expenses.entity';
import User from '../users/user.entity';

@Injectable()
export class ExpensesService {
  constructor() {}

  async addExpense() {
    return true;
  }
}
