import { Body, Controller, Post } from '@nestjs/common';
import { createExpenseDto } from './dto/createExpense.dto';
import { FriendsService } from '../friends/friends.service';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  addExpense(@Body() body: createExpenseDto): any {
    return this.expensesService.addExpense(body);
  }
}
