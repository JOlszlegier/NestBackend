import { ApiProperty } from '@nestjs/swagger';

//nazwa ? teoretycznie to jest struktura requesta ale czy nazwiesz to createGroup xd
export class CreateGroupDto {
  @ApiProperty({ type: String, description: 'Group name' })
  groupName: string;
  @ApiProperty({
    type: [Number],
    description: 'emails  of users inside the group',
  })
  usersEmails: [string];
}
