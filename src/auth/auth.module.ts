import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/schemas/user.schema'; // Adjust the path as per your project structure
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Import UserModel here
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // Replace with your actual secret key
      signOptions: { expiresIn: '1d' } // Token expiration time (e.g., 1 day)
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
