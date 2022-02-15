import { ApiProperty } from '@nestjs/swagger';
import { eachUserExpenseDto } from './eachUserExpense.dto';

export class createExpenseDto {
  @ApiProperty({
    type: Number,
    description: 'Id of user money will be sent to',
  })
  public to: number;

  @ApiProperty({
    type: String,
    description: 'Description of expense',
  })
  public description: string;

  @ApiProperty({
    type: String,
    description: 'Group name',
  })
  public groupName: string;

  public eachUserValue: [
    {
      from: number;
      value: number;
    },
  ];
}
