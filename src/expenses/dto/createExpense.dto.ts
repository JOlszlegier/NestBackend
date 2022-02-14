import { ApiProperty } from '@nestjs/swagger';

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

  @ApiProperty({
    type: Date,
    description: 'Creation date',
  })
  public expenseDate: Date;

  //??? jak dodac obiekt
}
