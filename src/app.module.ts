import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { AmenityModule } from './amenities/amenities.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { LogementModule } from './logement/logement.module';
import { CategoryModule } from './categories/categories.module';
import { AddressModule } from './address/address.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    CloudinaryModule,
    AmenityModule,
    UserModule, 
    AuthModule,
    LogementModule,
    CategoryModule,
    AddressModule,
    TransactionsModule,
    ReservationsModule,
     ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
