// user.service.ts
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto/create-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Address, AddressDocument } from 'src/schemas/address.schema';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
              @InjectModel(Address.name) private addressModel: Model<AddressDocument>,
              private readonly cloudinaryService: CloudinaryService,
) {}



 
async createUser(createUserDto: CreateUserDto): Promise<User> {
  const { address_code, image, ...userData } = createUserDto;

  // Check if the email is already registered
  const existingUser = await this.userModel.findOne({ email: userData.email }).exec();
  if (existingUser) {
    throw new ConflictException('Email address must be unique');
  }

  // Find the address by its code
  const address = await this.addressModel.findOne({ address_code }).exec();
  if (!address) {
    throw new NotFoundException('Address not found');
  }

  // Upload image to Cloudinary if provided
  let imageUrl: string;
  if (image) {
    const uploadedimage = await this.cloudinaryService.uploadImage(image, 'images');
    imageUrl = uploadedimage.secure_url;
  }

  const createdUser = new this.userModel({
    ...userData,
    image: imageUrl, // Set image URL
    address: address, // Set user's address
  });

  return createdUser.save();
}

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async deleteUser(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}
