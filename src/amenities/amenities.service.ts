import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Amenity, AmenityDocument } from '../schemas/amenity.schema';
import { AmenityDto, CreateAmenitiesDto } from './dto/create-amenity.dto';
@Injectable()
export class AmenityService {
  constructor(
    @InjectModel(Amenity.name) private amenityModel: Model<AmenityDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createAmenityDto: AmenityDto): Promise<Amenity> {
    const { amenity_code, icon, svg, ar, fr, en, type } = createAmenityDto;

    const existingAmenity = await this.amenityModel.findOne({ amenity_code }).exec();
    if (existingAmenity) {
      throw new ConflictException('Amenity code must be unique');
    }

    let uploadIconUrl;
    if (icon) {
      const uploadIcon = await this.cloudinaryService.uploadImage(icon, 'amenities');
      uploadIconUrl = uploadIcon.secure_url;
    }

    const createdAmenity = new this.amenityModel({
      amenity_code,
      icon: uploadIconUrl,
      svg,
      type,
      ar: { name: ar.name },
      fr: { name: fr.name },
      en: { name: en.name },
    });

    return createdAmenity.save();
  }

  async createMany(createAmenitiesDto: CreateAmenitiesDto): Promise<Amenity[]> {
    const amenities = createAmenitiesDto.amenities;
    const createdAmenities = [];

    for (const amenityDto of amenities) {
      const { amenity_code, icon, svg, ar, fr, en, type } = amenityDto;

      const existingAmenity = await this.amenityModel.findOne({ amenity_code }).exec();
      if (existingAmenity) {
        throw new ConflictException(`Amenity code ${amenity_code} must be unique`);
      }

      let uploadIconUrl;
      if (icon) {
        const uploadIcon = await this.cloudinaryService.uploadImage(icon, 'amenities');
        uploadIconUrl = uploadIcon.secure_url;
      }

      const createdAmenity = new this.amenityModel({
        amenity_code,
        icon: uploadIconUrl,
        svg,
        type,
        ar: { name: ar.name },
        fr: { name: fr.name },
        en: { name: en.name },
      });

      createdAmenities.push(await createdAmenity.save());
    }

    return createdAmenities;
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
        svg: amenity.svg,
        type:amenity.type,
      };
    });
  }
}
