import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateExpenseDto } from './dto/createExpense.dto';
import { ExpensesService } from './expenses.service';
import { ApiBody, ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('expenses')
export class ExpensesController {
  constructor(private expensesService: ExpensesService) {}

  @ApiBody({
    type: CreateExpenseDto,
  })
  @ApiOkResponse({
    description: 'Expense has been created',
  })
  @Post()
  addExpense(@Body() body: CreateExpenseDto): any {
    return this.expensesService.addExpense(body);
  }

  @ApiOkResponse({
    description: 'Incoming expenses',
  })
  @Get('plus')
  getExpensesPlus(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.getExpensesPlus(userId, groupName);
  }

  @ApiOkResponse({
    description: 'Outcoming expenses',
  })
  @Get('minus')
  getExpensesMinus(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.getExpensesMinus(userId, groupName);
  }

  @ApiOkResponse({
    description: 'Information about who and how much you owe money to',
  })
  @Get('settleUpInfo')
  getSettleUpInfo(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.getExpensesInfo(userId, groupName);
  }

  //brak body
  @ApiOkResponse({
    description: 'Settled up',
  })
  @Post('settleUp')
  settleUp(@Body() body: { userId: number; expensesIds: number[] }): any {
    return this.expensesService.settleUp(body.userId, body.expensesIds);
  }

  @ApiOkResponse({
    description: 'Info of your bank balance',
  })
  @Get('balanceInfo')
  balanceCheck(
    @Query('userId') userId: number,
    @Query('groupName') groupName: string,
  ): any {
    return this.expensesService.balanceCheckInGroup(userId, groupName);
  }
}
