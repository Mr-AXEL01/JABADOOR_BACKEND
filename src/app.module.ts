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
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { TransactionsModule } from './transactions/transactions.module';
import { ReservationsService } from './reservations/reservations.service';

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
     ],
  controllers: [AppController],
  providers: [AppService, ReservationsService],
})
export class AppModule {}
