import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserInfo } from "./user-info.entity";
import { UserContact } from "./user-contact.entity";
import { UserAddress } from "./user-address.entity";
import { UserAcademics } from "./user-academics.entity";

@Entity()
export class User {
    // user id
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // user info tb
    @OneToOne(() => UserInfo, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    userInfo: UserInfo;

    // user contact tb
    @OneToOne(() => UserContact, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    userContact: UserContact;

    // user's address tb
    @OneToOne(() => UserAddress, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    userAddress: UserAddress;

    // user Academics details
    @OneToOne(() => UserAcademics, { cascade: true, eager: true, onDelete: 'CASCADE' })
    @JoinColumn()
    userAcademics: UserAcademics;
}