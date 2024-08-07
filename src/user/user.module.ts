import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from 'src/schemas/user.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { AddressModule } from 'src/address/address.module';
import { Host, HostSchema } from 'src/schemas/Host.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema },
      { name: Host.name, schema: HostSchema }
    ]

      
    ),
    CloudinaryModule,
    AddressModule,
    
  ],

  controllers:[UserController],
  providers: [UserService],
  exports: [UserService], // If UserService is used outside this module
})
export class UserModule {}
