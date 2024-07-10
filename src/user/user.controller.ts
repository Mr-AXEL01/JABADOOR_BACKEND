import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserDocument } from '../schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDocument> {
    return this.userService.createUser(createUserDto);
  }

  @Put('wishlist')
  async addToWishlist(
    @Body('user_code') userCode: string,
    @Body('Host_code') hostCode: string,
  ): Promise<UserDocument> {
    return this.userService.addToWishlist(userCode, hostCode);
  }

  @Delete('wishlist')
  async removeFromWishlist(
    @Body('user_code') userCode: string,
    @Body('Host_code') hostCode: string,
  ): Promise<UserDocument> {
    return this.userService.removeFromWishlist(userCode, hostCode);
  }

  @Get('wishlist')
  async getWishlist(@Body('user_code') userCode: string): Promise<any[]> {
    const user = await this.userService.findByUserCode(userCode);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user.wishlist;
  }

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.deleteUser(id);
  }
}
