import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amenity, AmenityDocument } from '../../schemas/amenity.schema';
<<<<<<< HEAD
import { CloudinaryService } from '../cloudinary/cloudinary.service';
=======
import { CloudinaryService } from '../cloudinary2/cloudinary.service';
import { Express } from 'express';
>>>>>>> 9979e7fa60033954fc2d82c3dc9fbc45cc7b99f0

@Injectable()
export class AmenitiesService {
  constructor(
    @InjectModel(Amenity.name) private amenityModel: Model<AmenityDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(amenity: Amenity, icon: string): Promise<Amenity> {
    const uploadResult = await this.cloudinaryService.uploadImage(icon, 'amenties');
    const createdAmenity = new this.amenityModel({
      ...amenity,
      icon: uploadResult.secure_url,
    });
    return createdAmenity.save();
  }

  async findAll(language?: string): Promise<any[]> {
    const amenities = await this.amenityModel.find().exec();
    return amenities.map(amenity => ({
        _id: amenity._id,
        name: amenity.translations[language] ? amenity.translations[language] :amenity.name,
        icon: amenity.icon, 
    }));
  }
}
