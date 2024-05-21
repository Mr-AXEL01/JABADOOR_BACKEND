import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Amenity, AmenityDocument } from '../../schemas/amenity.schema';

@Injectable()
export class AmenitiesService {
  constructor(@InjectModel(Amenity.name) private amenityModel: Model<AmenityDocument>) {}

  async create(amenity: Amenity): Promise<Amenity> {
    const createdAmenity = new this.amenityModel(amenity);
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
