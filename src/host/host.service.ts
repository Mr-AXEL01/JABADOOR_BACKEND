import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Address, AddressDocument } from '../schemas/address.schema';
import { Amenity, AmenityDocument } from '../schemas/amenity.schema';
import { Category, CategoryDocument } from '../schemas/category.schema';

import { CreateHostDto } from './dto/create-host.dto';
import { Host, HostDocument } from '../schemas/host.schema';


@Injectable()
export class HostService {
  constructor(
    @InjectModel(Host.name) private readonly HostModel: Model<HostDocument>,
    @InjectModel(Address.name) private readonly addressModel: Model<AddressDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Amenity.name) private readonly amenityModel: Model<AmenityDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }


  async searchHost(query: string): Promise<Host[]> {
    const pipeline = [
      {
        $search: {
          index: 'SearchHost',
          text: {
            query: query,
            path: {
              wildcard: '*'
            },
          },
        },
      },
      {
        $match: {
          status: 'ACTIVE',
        },
      },
      {
        $limit: 10,
      },
    ];

    return this.HostModel.aggregate(pipeline).exec();
  }

  async findByFilters(
    amenitiesIds: string[], 
    category_code: string, 
    minPrice: number, 
    maxPrice: number
  ): Promise<Host[]> {
    const filter: any = {
      status: 'ACTIVE',
      price: { $gte: minPrice, $lte: maxPrice },
    };
  
    if (amenitiesIds && amenitiesIds.length > 0) {
      filter['amenities._id'] = { $in: amenitiesIds };
    }
  
    if (category_code) {
      filter['category.category_code'] = category_code;
    }
  
    console.log('Constructed filter:', JSON.stringify(filter, null, 2));
  
    const results = await this.HostModel.find(filter).exec();
    
    console.log('Number of results:', results.length);
    return results;
  }
  

  async create(createHostDto: CreateHostDto): Promise<Host> {
    const { address_code, category_code, amenitiesIds, images } = createHostDto;

    // Fetch address
    const address = await this.addressModel.findOne({ address_code }).exec();
    if (!address) {
      throw new NotFoundException(`Address with ID ${address_code} not found`);
    }

    // Fetch category
    const category = await this.categoryModel.findOne({ category_code }).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${category_code} not found`);
    }

    // Fetch amenities if provided
    let amenities = [];
    if (amenitiesIds && amenitiesIds.length > 0) {
      amenities = await this.amenityModel.find({
        _id: { $in: amenitiesIds },
      }).exec();
      if (amenities.length !== amenitiesIds.length) {
        throw new NotFoundException(`One or more amenities not found`);
      }
    }

   
    const uploadedImages = [];
    for (const image of images) {
      const uploadedImage = await this.cloudinaryService.uploadImage(image, 'Hosts');
      uploadedImages.push({
        public_id: uploadedImage.public_id,
        url: uploadedImage.url,
        secure_url: uploadedImage.secure_url,
        format: uploadedImage.format,
      });
    }

    // Construct Host object with complete address, category, and amenities objects
    const createdHost = new this.HostModel({
      ...createHostDto,
      address: address.toObject(), // Convert to plain object
      category: category.toObject(), // Convert to plain object
      amenities,
      image: uploadedImages, // Set the uploaded images array
    });

    return createdHost.save();
  }


  async findAll(language?: string): Promise<any[]> {
    const Hosts = await this.HostModel.find().exec();
    return Hosts.map(Host => this.applyTranslations(Host, language));
  }

  private applyTranslations(Host: any, language: string = 'en'): any {
    const HostObj = Host.toObject();

    // Apply translations for the main Host fields
    if (HostObj.translations && HostObj.translations[language]) {
        const translatedFields = HostObj.translations[language];
        HostObj.nom = translatedFields.nom;
        HostObj.About = translatedFields.About;
    }

    // Apply translations for the address
    if (HostObj.address && HostObj.address[language]) {
        const translatedAddress = HostObj.address[language];
        HostObj.address = {
            ...HostObj.address,
            ...translatedAddress
        };
        delete HostObj.address.en;
        delete HostObj.address.fr;
        delete HostObj.address.ar;
    }

    // Apply translations for the category
    if (HostObj.category && HostObj.category[language]) {
        const translatedCategory = HostObj.category[language];
        HostObj.category = {
            ...HostObj.category,
            ...translatedCategory
        };
        delete HostObj.category.en;
        delete HostObj.category.fr;
        delete HostObj.category.ar;
    }

    // Apply translations for the amenities
    if (HostObj.amenities && HostObj.amenities.length > 0) {
        HostObj.amenities = HostObj.amenities.map(amenity => {
            if (amenity[language]) {
                const translatedAmenity = amenity[language];
                amenity = {
                    ...amenity,
                    ...translatedAmenity
                };
            }
            delete amenity.en;
            delete amenity.fr;
            delete amenity.ar;
            return amenity;
        });
    }

    return HostObj;
}
async findByHostCode(hostCode: string): Promise<Host | null> {
  console.log(hostCode);
  
  const host = await this.HostModel.findOne({ Host_code: hostCode }).exec();
  return host;
}



}
