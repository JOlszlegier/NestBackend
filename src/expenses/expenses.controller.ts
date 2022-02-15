import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { createExpenseDto } from './dto/createExpense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @Post()
  addExpense(@Body() body: createExpenseDto): any {
    return this.expensesService.addExpense(body);
  }

  @Get('plus')
  getExpensesPlus(@Query('userId') userId: number): any {
    return this.expensesService.getExpensesPlus(userId);
  }

  @Get('minus')
  getExpensesMinus(@Query('userId') userId: number): any {
    return this.expensesService.getExpensesMinus(userId);
  }
}
