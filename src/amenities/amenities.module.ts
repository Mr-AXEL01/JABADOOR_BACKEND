import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmenitiesService } from './amenities.service';
import { AmenitiesController } from './amenities.controller';
import { Amenity, AmenitySchema } from '../../schemas/amenity.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Amenity.name, schema: AmenitySchema }])],
  providers: [AmenitiesService],
  controllers: [AmenitiesController],
})
export class AmenitiesModule {}
