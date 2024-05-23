import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Amenity, AmenityDocument } from 'src/schemas/amenity.schema';


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
