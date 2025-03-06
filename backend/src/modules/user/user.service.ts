import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInfo } from './entities/user-info.entity';
import { UserContact } from './entities/user-contact.entity';
import { UserAddress } from './entities/user-address.entity';
import { UserAcademics } from './entities/user-academics.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async createUser(data: CreateUserDto) {
        const user = this.userRepository.create(data)
        return await this.userRepository.save(user)
    }

    async getAllUsers() {
        return this.userRepository.find();
    }

    async getOneUser(id: string) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) { throw new NotFoundException('User not found'); }
        return user;
    }

    async updateOneUser(id: string, data: UpdateUserDto) {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ["userInfo", "userContact", "userAddress", "userAcademics"],
        });

        if (!user) throw new NotFoundException("User not found");

        if (!user.userInfo) { user.userInfo = new UserInfo(); }
        if (!user.userContact) { user.userContact = new UserContact(); }
        if (!user.userAddress) { user.userAddress = new UserAddress(); }
        if (!user.userAcademics) { user.userAcademics = new UserAcademics(); }
        if (user.userInfo && data.userInfo) {
            Object.assign(user.userInfo, data.userInfo);
        }
        if (user.userContact && data.userContact) {
            Object.assign(user.userContact, data.userContact);
        }
        if (user.userAddress && data.userAddress) {
            Object.assign(user.userAddress, data.userAddress);
        }
        if (user.userAcademics && data.userAcademics) {
            Object.assign(user.userAcademics, data.userAcademics);
        }

        return await this.userRepository.save(user);
    }


    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id }
        });
        if (!user) throw new NotFoundException("User not found");

        await this.userRepository.delete(id);
    }
}
