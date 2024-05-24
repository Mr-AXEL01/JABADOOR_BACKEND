import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';
import { Amenity, AmenityDocument } from '../schemas/amenity.schema';

@Injectable()
export class AmenityService {
  constructor(
    @InjectModel(Amenity.name) private amenityModel: Model<AmenityDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createAmenityDto: CreateAmenityDto): Promise<Amenity> {
    const { icon, ar, fr, en } = createAmenityDto;
    const uploadIcon = await this.cloudinaryService.uploadImage(icon, 'amenities');
    const createdAmenity = new this.amenityModel({
      ...createAmenityDto,
      icon: uploadIcon.secure_url,
    });

    return createdAmenity.save();
  }

  async findAll(lang: string = 'en'): Promise<any[]> {
    const amenities = await this.amenityModel.find().exec();
    return amenities.map(amenity => {
      let name;
      // Return name based on the language that the client is requesting
      switch (lang) {
        case 'ar':
          name = amenity.ar.name;
          break;
        case 'fr':
          name = amenity.fr.name;
          break;
        case 'en':
        default:
          name = amenity.en.name;
          break;
      }
      return {
        _id: amenity._id,
        name: name,
        icon: amenity.icon,
      };
    });
  }

  async findOne(id: string): Promise<Amenity> {
    const amenity = await this.amenityModel.findById(id).exec();
    if (!amenity) {
      throw new NotFoundException(`Amenity with id ${id} not found`);
    }
    return amenity;
  }
}
