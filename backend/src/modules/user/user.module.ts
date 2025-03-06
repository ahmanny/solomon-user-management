import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserInfo } from "./entities/user-info.entity";
import { UserContact } from "./entities/user-contact.entity";
import { UserAddress } from "./entities/user-address.entity";
import { UserAcademics } from "./entities/user-academics.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";




@Module({
    // import all user entities
    imports: [TypeOrmModule.forFeature([ User,UserInfo, UserContact, UserAddress, UserAcademics])],
    // register user controller
    controllers: [UserController],
    // register userService
    providers: [UserService],
    // makes the user service available in other modules
    exports: [UserService],
})

export class UserModule { }