import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AmenityController } from './amenities.controller';
import { AmenityService } from './amenities.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Amenity, AmenitySchema } from 'src/schemas/amenity.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Amenity.name, schema: AmenitySchema }]),
    CloudinaryModule, // Ensure CloudinaryModule is imported here
  ],
  providers: [AmenityService],
  controllers: [AmenityController],
  exports: [AmenityService,MongooseModule]

})
export class AmenityModule {}
