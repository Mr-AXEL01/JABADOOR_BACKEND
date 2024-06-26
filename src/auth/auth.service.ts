import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from 'src/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService
  ) {}

  async register(userDto: any): Promise<User> {
    // Check if the email is already registered
    const existingUser = await this.userModel.findOne({ email: userDto.email }).exec();
    if (existingUser) {
      throw new NotFoundException('Email address must be unique');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const newUser = new this.userModel({
      ...userDto,
      password: hashedPassword,
      wishlist: [] // Ensure wishlist is initialized as empty
    });

    return newUser.save();
  }

  async login(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    // Generate JWT token
    const payload = { user_code: user.user_code, email: user.email }; // Customize as per your needs
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
