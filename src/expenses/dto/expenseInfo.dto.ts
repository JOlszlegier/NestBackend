import { ApiProperty } from '@nestjs/swagger';

export class expenseListInfoDto {
  @ApiProperty({
    type: String,
    description: 'description of the expense',
  })
  public description: string;

  @ApiProperty({
    type: Number,
    description: 'amount of money in the expense',
  })
  public amount: number;
}
