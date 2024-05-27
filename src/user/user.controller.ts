// user.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto/create-user.dto';
import { User } from './user.interface';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }
  @Put('wishlist')
  async addToWishlist(@Body('user_code') userCode: string, @Body('logement_code') logementCode: string): Promise<User> {
    return this.userService.addToWishlist(userCode, logementCode);
  }

  @Delete('wishlist')
  async removeFromWishlist(@Body('user_code') userCode: string, @Body('logement_code') logementCode: string): Promise<User> {
    return this.userService.removeFromWishlist(userCode, logementCode);
  }

  @Get('wishlist')
  async getWishlist(@Body('user_code') userCode: string): Promise<any[]> {
    return this.userService.getWishlist(userCode);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
