import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { AddressModule } from 'src/address/address.module';
import { CategoryModule } from 'src/categories/categories.module';
import { AmenityModule } from 'src/amenities/amenities.module';
import { Host, HostSchema } from '../schemas/host.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Host.name, schema: HostSchema }]),
    AddressModule, 
    CategoryModule,
    AmenityModule,
    ReservationsModule,
    CloudinaryModule
  ],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
  