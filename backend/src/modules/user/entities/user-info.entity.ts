import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('users_info_tb')
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  profilePhoto: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: 'date', nullable: true })
  dob: Date;

  @Column({ nullable: true })
  occupation: string;

  @Column({ nullable: true })
  gender: string;

  @OneToOne(() => User, (user) => user.userInfo)
  user: User
}
