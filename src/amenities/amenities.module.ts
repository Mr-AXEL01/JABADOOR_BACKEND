// amenities.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Import CloudinaryModule
import { AmenitiesController } from './amenities.controller';
import { AmenitiesService } from './amenities.service';
import { Amenity, AmenitySchema } from 'schemas/amenity.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Amenity.name, schema: AmenitySchema }]),
    CloudinaryModule, // Ensure CloudinaryModule is imported here
  ],
  providers: [AmenitiesService],
  controllers: [AmenitiesController],
  exports: [AmenitiesService,MongooseModule]

})
export class AmenitiesModule {}
