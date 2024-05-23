import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogementService } from './logement.service';
import { LogementController } from './logement.controller';

import { AddressModule } from 'src/address/address.module';
import { CategorieModule } from 'src/categories/categories.module';
import { AmenitiesModule } from 'src/amenities/amenities.module';
import { Logement, LogementSchema } from 'src/schemas/logement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Logement.name, schema: LogementSchema }]),
    AddressModule, 
    CategorieModule,
    AmenitiesModule,
  ],
  controllers: [LogementController],
  providers: [LogementService],
})
export class LogementModule {}
