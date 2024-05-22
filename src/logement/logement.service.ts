import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLogementDto } from './dto/create-logement.dto';
import { Address } from 'schemas/address.schema';
import { Categorie } from 'schemas/category.schema';
import { Amenity } from 'schemas/amenity.schema';
import { Logement } from 'schemas/logement.schema';


@Injectable()
export class LogementService {
  constructor(
    @InjectModel(Logement.name) private logementModel: Model<Logement>,
    @InjectModel(Address.name) private addressModel: Model<Address>,
    @InjectModel(Categorie.name) private categoryModel: Model<Categorie>,
    @InjectModel(Amenity.name) private amenityModel: Model<Amenity>,  // Assume you have an Amenity model
  ) {}



  async create(createLogementDto: CreateLogementDto): Promise<Logement> {
    const { addressId, categoryId, amenitiesIds } = createLogementDto;

    // Fetch address
    const address = await this.addressModel.findById(addressId).exec();
    if (!address) {
        throw new NotFoundException(`Address with ID ${addressId} not found`);
    }

    // Fetch category
    const category = await this.categoryModel.findById(categoryId).exec();
    if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
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
    
    // Remove the translations objects
    delete logementObj.translations;
    if (logementObj.address) delete logementObj.address.translations;
    if (logementObj.category) delete logementObj.category.translation;

    return logementObj;
  }
}
