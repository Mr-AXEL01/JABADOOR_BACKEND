import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HostService } from './Host.service';
import { HostController } from './Host.controller';

import { AddressModule } from 'src/address/address.module';
import { CategoryModule } from 'src/categories/categories.module';
import { AmenityModule } from 'src/amenities/amenities.module';
import { Host, HostSchema } from 'src/schemas/Host.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Host.name, schema: HostSchema }]),
    AddressModule, 
    CategoryModule,
    AmenityModule,
    CloudinaryModule
  ],
  controllers: [HostController],
  providers: [HostService],
})
export class HostModule {}
  