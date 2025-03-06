import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { UserInfo } from './user-info.entity';
import { User } from './user.entity';

@Entity('users_contact_tb')
export class UserContact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  fax?: string;

  @Column({ nullable: true })
  linkedinUrl?: string;

  // register user contact to user entity
  @OneToOne(() => User, (user) => user.userContact)
  user: User
}
