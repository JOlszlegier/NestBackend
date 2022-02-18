import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    type: Number,
    description: 'Id of user money will be sent to',
  })
  public to: string;

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
    description: 'Array of users debt',
    type: Object,
  })
  public eachUserValue: [
    {
      from: string;
      value: number;
    },
  ];
}
