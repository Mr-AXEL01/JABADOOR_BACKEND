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

    // Upload images to Cloudinary
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
    const Hosts = await this.HostModel.find().populate('category').populate('address').exec();
    return Hosts.map(Host => this.applyTranslations(Host, language));
  }

  private applyTranslations(Host: any, language?: string): any {
    const HostObj = Host.toObject();

    // Apply translations for the main Host fields
    if (language && HostObj.translations && HostObj.translations[language]) {
      const translatedFields = HostObj.translations[language];
      HostObj.nom = translatedFields.nom;
      HostObj.About = translatedFields.About;
    }

    // Apply translations for the address
    if (HostObj.address && HostObj.address.translations && HostObj.address.translations[language]) {
      const translatedAddress = HostObj.address.translations[language];
      HostObj.address.street = translatedAddress.street;
      HostObj.address.city = translatedAddress.city;
      HostObj.address.state = translatedAddress.state;
      HostObj.address.country = translatedAddress.country;
    }

    // Apply translations for the category
    if (HostObj.category && HostObj.category.translation && HostObj.category.translation[language]) {
      const translatedCategory = HostObj.category.translation[language];
      HostObj.category.name = translatedCategory.name;
    }

    // Apply translations for the amenities
    if (HostObj.amenities && HostObj.amenities.length > 0) {
      HostObj.amenities = HostObj.amenities.map(amenity => {
        if (language && amenity.translations && amenity.translations[language]) {
          amenity.name = amenity.translations[language];
        }
        delete amenity.translations;
        return amenity;
      });
    }

    // Remove the translations objects
    delete HostObj.translations;
    if (HostObj.address) delete HostObj.address.translations;
    if (HostObj.category) delete HostObj.category.translation;

    return HostObj;
  }
}
