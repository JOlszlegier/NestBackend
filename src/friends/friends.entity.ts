import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Friends {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty({ type: Number, description: 'user Id' })
  @Column({ unique: true })
  public userId: number;

  @ApiProperty({ type: [Number], description: 'friends of user' })
  @Column('int', { array: true })
  public friendsId: number[];
}

export default Friends;
