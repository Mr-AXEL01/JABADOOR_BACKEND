import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AmenityModule } from './amenities/amenities.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './categories/categories.module';
import { AddressModule } from './address/address.module';

import { FilterModule } from './filter/filter.module';

import { TransactionsModule } from './transactions/transactions.module';

import { ReservationsModule } from './reservations/reservations.module';
import { HostModule } from './host/host.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CloudinaryModule,
    AmenityModule,
    UserModule, 
    AuthModule,
    HostModule,
    CategoryModule,
    AddressModule,
    FilterModule,
    TransactionsModule,
    ReservationsModule,
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
