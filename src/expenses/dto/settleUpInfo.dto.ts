import { ApiProperty } from '@nestjs/swagger';

export class settleUpInfoDto {
  @ApiProperty({
    type: String,
    description: 'userName of the user we owe money to',
  })
  public name: string;

  @ApiProperty({
    type: Number,
    description: 'amount of money we owe to the user',
  })
  public amount: number;
}
