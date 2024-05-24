import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogementDto } from './dto/create-logement.dto';
import { Address } from 'src/schemas/address.schema';
import { Amenity } from 'src/schemas/amenity.schema';
import { Category } from 'src/schemas/category.schema';
import { Logement } from 'src/schemas/logement.schema';

@Injectable()
export class LogementService {
  constructor(
    @InjectModel(Logement.name) private logementModel: Model<Logement>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Amenity.name) private amenityModel: Model<Amenity>,
  ) {}

  async create(createLogementDto: CreateLogementDto): Promise<Logement> {
    const { address_code, category_code, amenitiesIds } = createLogementDto;

    // Fetch address
    const address = await this.addressModel.findOne({address_code}).exec();
    if (!address) {
      throw new NotFoundException(`Address with ID ${address_code} not found`);
    }

    // Fetch category
    const category = await this.categoryModel.findOne({category_code}).exec();
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

    // Construct Logement object with complete address, category, and amenities objects
    const createdLogement = new this.logementModel({
      ...createLogementDto,
      address: address.toObject(), // Convert to plain object
      category: category.toObject(), // Convert to plain object
      amenities,
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
