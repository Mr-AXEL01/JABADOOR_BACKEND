import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, User } from '../schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async addToWishlist(userCode: string, hostCode: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ user_code: userCode });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.wishlist.push({ Host_code: hostCode, wishadded_date: new Date() });
    return user.save();
  }

  async removeFromWishlist(userCode: string, hostCode: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ user_code: userCode });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.wishlist = user.wishlist.filter(item => item.Host_code !== hostCode);
    return user.save();
  }

  async getWishlist(userCode: string): Promise<any[]> {
    const user = await this.userModel.findOne({ user_code: userCode }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user.wishlist;
  }

  async findAllUsers(): Promise<UserDocument[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
  }

  async deleteUser(id: string): Promise<UserDocument> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async findByUserCode(userCode: string): Promise<UserDocument> {
    return this.userModel.findOne({ user_code: userCode }).exec();
  }
}
