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
  getExpensesPlus(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.getExpensesPlus(userId, groupName);
  }

  @Get('minus')
  getExpensesMinus(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.getExpensesMinus(userId, groupName);
  }

  @Get('settleUpInfo')
  getSettleUpInfo(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.getExpensesInfo(userId, groupName);
  }

  @Post('settleUp')
  settleUp(@Body() body: { userId: number; expensesIds: number[] }): any {
    return this.expensesService.settleUp(body.userId, body.expensesIds);
  }
}
