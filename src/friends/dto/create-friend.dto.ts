import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendDto {
  @ApiProperty({ type: String, description: 'User Id number' })
  userId: string;
  @ApiProperty({ type: String, description: 'New friend email' })
  friendEmail: string;
}
