import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class Expenses {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty({
    type: Number,
    description: 'Id of user money will be sent to',
  })
  @Column()
  public to: number;

  @ApiProperty({
    type: String,
    description: 'Description of expense',
  })
  @Column()
  public description: string;

  @ApiProperty({
    type: String,
    description: 'Group name',
  })
  @Column()
  public groupName: string;

  @ApiProperty({
    type: Date,
    description: 'Creation date',
  })
  @Column()
  public expenseDate: Date;

  // ? jak dodac obiekt
}

export default Expenses;
