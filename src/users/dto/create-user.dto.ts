import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ type: String, description: 'email' })
  email: string;
  @ApiProperty({ type: String, description: 'name' })
  name: string;
  @ApiProperty({ type: String, description: 'password' })
  password: string;
  @ApiProperty({ type: Number, description: 'income' })
  income: number;
  @ApiProperty({ type: Number, description: 'outcome' })
  outcome: number;
}

export default CreateUserDto;
