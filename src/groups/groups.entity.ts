import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Groups {
  @PrimaryGeneratedColumn()
  public id?: number;

  //unique?
  @ApiProperty({ type: String, description: 'Group Name' })
  @Column()
  public groupName: string;

  @ApiProperty({
    type: [Number],
    description: 'id numbers of users inside the group',
  })
  @Column('int', { array: true })
  public usersIds: number[];
}

export default Groups;
