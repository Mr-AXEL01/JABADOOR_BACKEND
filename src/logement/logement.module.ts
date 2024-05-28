import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogementService } from './logement.service';
import { LogementController } from './logement.controller';

import { AddressModule } from 'src/address/address.module';
import { CategoryModule } from 'src/categories/categories.module';
import { AmenityModule } from 'src/amenities/amenities.module';
import { Logement, LogementSchema } from 'src/schemas/logement.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logement.name, schema: LogementSchema }]),
    AddressModule, 
    CategoryModule,
    AmenityModule,
    CloudinaryModule
  ],
  controllers: [LogementController],
  providers: [LogementService],
})
export class LogementModule {}
  