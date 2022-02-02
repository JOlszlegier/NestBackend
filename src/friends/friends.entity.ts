import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Friends {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty({ type: String, description: 'user Id' })
  @Column()
  public userId: string;

  @ApiProperty({ type: [String], description: 'friends of user' })
  @Column('int', { array: true })
  public friendsId: string[];
}

export default Friends;
