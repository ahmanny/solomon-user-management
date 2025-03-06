import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('users_academics_tb')
export class UserAcademics {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', array: true, nullable: true })
    pastSchools: string[];

    // register user past schools to user details
    @OneToOne(() => User, (user) => user.userAcademics)
    user: User;
}
