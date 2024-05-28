import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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
    const { amenity_code, icon, ar, fr, en } = createAmenityDto;

    // be sure that the amenity_code is unique 
    const existingAmenity = await this.amenityModel.findOne({ amenity_code }).exec();
    if (existingAmenity) {
      throw new ConflictException('Amenity code must be unique');
    }

    const uploadIcon = await this.cloudinaryService.uploadImage(icon, 'amenities');
    const createdAmenity = new this.amenityModel({
      amenity_code,
      icon: uploadIcon.secure_url,
      ar: { name: ar.name },
      fr: { name: fr.name },
      en: { name: en.name },
    });

    return createdAmenity.save();
  }

  async findAll(lang: string = 'en'): Promise<any[]> {
    const amenities = await this.amenityModel.find().exec();
    return amenities.map(amenity => {
      let name;
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
        amenity_code: amenity.amenity_code,
        name: name,
        icon: amenity.icon,
      };
    });
  }

  // async findOne(id: string): Promise<Amenity> {
  //   const amenity = await this.amenityModel.findById(id).exec();
  //   if (!amenity) {
  //     throw new NotFoundException(`Amenity with id ${id} not found`);
  //   }
  //   return amenity;
  // }
}
