import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateLogementDto } from './dto/create-logement.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Address, AddressDocument } from 'src/schemas/address.schema';
import { Amenity, AmenityDocument } from 'src/schemas/amenity.schema';
import { Category, CategoryDocument } from 'src/schemas/category.schema';
import { Logement, LogementDocument } from 'src/schemas/logement.schema';

@Injectable()
export class LogementService {
  constructor(
    @InjectModel(Logement.name) private readonly logementModel: Model<LogementDocument>,
    @InjectModel(Address.name) private readonly addressModel: Model<AddressDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel(Amenity.name) private readonly amenityModel: Model<AmenityDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) { }




  async findByFilters(
    amenitiesIds: string[], 
    category_code: string, 
    minPrice: number, 
    maxPrice: number
  ): Promise<Logement[]> {
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
  
    const results = await this.logementModel.find(filter).exec();
    
    console.log('Number of results:', results.length);
    return results;
  }
  

  async create(createLogementDto: CreateLogementDto): Promise<Logement> {
    const { address_code, category_code, amenitiesIds, images } = createLogementDto;

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
      const uploadedImage = await this.cloudinaryService.uploadImage(image, 'logements');
      uploadedImages.push({
        public_id: uploadedImage.public_id,
        url: uploadedImage.url,
        secure_url: uploadedImage.secure_url,
        format: uploadedImage.format,
      });
    }

    // Construct Logement object with complete address, category, and amenities objects
    const createdLogement = new this.logementModel({
      ...createLogementDto,
      address: address.toObject(), // Convert to plain object
      category: category.toObject(), // Convert to plain object
      amenities,
      image: uploadedImages, // Set the uploaded images array
    });

    return createdLogement.save();
  }


  async findAll(language?: string): Promise<any[]> {
    const logements = await this.logementModel.find().populate('category').populate('address').exec();
    return logements.map(logement => this.applyTranslations(logement, language));
  }

  private applyTranslations(logement: any, language?: string): any {
    const logementObj = logement.toObject();

    // Apply translations for the main logement fields
    if (language && logementObj.translations && logementObj.translations[language]) {
      const translatedFields = logementObj.translations[language];
      logementObj.nom = translatedFields.nom;
      logementObj.About = translatedFields.About;
    }

    // Apply translations for the address
    if (logementObj.address && logementObj.address.translations && logementObj.address.translations[language]) {
      const translatedAddress = logementObj.address.translations[language];
      logementObj.address.street = translatedAddress.street;
      logementObj.address.city = translatedAddress.city;
      logementObj.address.state = translatedAddress.state;
      logementObj.address.country = translatedAddress.country;
    }

    // Apply translations for the category
    if (logementObj.category && logementObj.category.translation && logementObj.category.translation[language]) {
      const translatedCategory = logementObj.category.translation[language];
      logementObj.category.name = translatedCategory.name;
    }

    // Apply translations for the amenities
    if (logementObj.amenities && logementObj.amenities.length > 0) {
      logementObj.amenities = logementObj.amenities.map(amenity => {
        if (language && amenity.translations && amenity.translations[language]) {
          amenity.name = amenity.translations[language];
        }
        delete amenity.translations;
        return amenity;
      });
    }

    // Remove the translations objects
    delete logementObj.translations;
    if (logementObj.address) delete logementObj.address.translations;
    if (logementObj.category) delete logementObj.category.translation;

    return logementObj;
  }
}
