import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @ApiProperty({ type: String, description: 'email' })
  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @ApiProperty({ type: String, description: 'password' })
  @Column()
  public password: string;

  @ApiProperty({ type: Number, description: 'income' })
  @Column()
  public income: number;

  @ApiProperty({ type: Number, description: 'outcome' })
  @Column()
  public outcome: number;
}

export default User;
