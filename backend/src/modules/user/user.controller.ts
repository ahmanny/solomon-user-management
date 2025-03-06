import { Controller, Post, Get, Param, Body, Patch, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }


    // controller to create a user
    @Post('/signup')
    @UseInterceptors(FileInterceptor('profilePhoto', {
        storage: diskStorage({
            destination: './uploads',
            filename(req, file, callback) {
                const uniqSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, file.fieldname + '-' + uniqSuffix + extname(file.originalname))
            },
        })
    }))
    async createUser(
        @UploadedFile() file: Express.Multer.File,
        @Body('userData') userData: string
    ) {
        const user = JSON.parse(userData);
        user.userInfo.profilePhoto = `/uploads/${file.filename}`; // Store file path

        return await this.userService.createUser(user);
    }
    // controller to get all users
    @Get('/users')
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    // controler to get a user with the id 
    @Get('/get/:id')
    async getAUser(@Param('id') id: string): Promise<User> {
        return this.userService.getOneUser(id);
    }

    // controller to update a user by id 
    @Patch('/update/:id')
    async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
        return this.userService.updateOneUser(id, data);
    }

    // cntroller to delete user by id
    @Delete('/delete/:id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.userService.deleteUser(id);
    }
}
