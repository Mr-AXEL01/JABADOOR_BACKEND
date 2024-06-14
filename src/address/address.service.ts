// address.service.ts
import { BadRequestException, Injectable, NotFoundException, Query } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Address, AddressDocument } from 'src/schemas/address.schema';
import { AddressDetails } from './interfaces/address.interface';


@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) {}

  async createAddress(fr: AddressDetails, en: AddressDetails, ar: AddressDetails): Promise<Address> {
    const createdAddress = new this.addressModel({ fr, en, ar });
    return createdAddress.save();
  }



async createAddresses(addresses: { fr: AddressDetails, en: AddressDetails, ar: AddressDetails }[]): Promise<Address[]> {
  const createdAddresses = [];
  for (const address of addresses) {
    const createdAddress = new this.addressModel(address);
    createdAddresses.push(await createdAddress.save());
  }
  return createdAddresses;
}

async findAllAddresses(language: string = 'en'): Promise<Address[]> {
  return this.addressModel.find().select(language).exec();
}

  async findAddressById(id: string): Promise<Address> {
    const address = await this.addressModel.findById(id).exec();
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async updateAddress(id: string, fr: AddressDetails, en: AddressDetails, ar: AddressDetails): Promise<Address> {
    const updatedAddress = await this.addressModel.findById(id).exec();
    if (!updatedAddress) {
      throw new NotFoundException('Address not found');
    }

    updatedAddress.fr = fr;
    updatedAddress.en = en;
    updatedAddress.ar = ar;

    return updatedAddress.save();
  }

  async deleteAddress(id: string): Promise<Address> {
    const deletedAddress = await this.addressModel.findByIdAndDelete(id).exec();
    if (!deletedAddress) {
      throw new NotFoundException('Address not found');
    }
    return deletedAddress;
  }

  async findAddresses(search: string, language: string): Promise<Address[]> {
    if (!['fr', 'en', 'ar'].includes(language)) {
      throw new Error('Invalid language code');
    }

    const query = {
      [`${language}.address`]: { $regex: search, $options: 'i' },
      [`${language}.city`]: { $regex: search, $options: 'i' },
      [`${language}.country`]: { $regex: search, $options: 'i' }
    };

    return this.addressModel.find({
      $or: [
        { [`${language}.address`]: query[`${language}.address`] },
        { [`${language}.city`]: query[`${language}.city`] },
        { [`${language}.country`]: query[`${language}.country`] }
      ]
    }).exec();
  }

  async searchAddresses(
    @Query('q') search: string,
    @Query('lang') language: string
  ): Promise<Address[]> {
    if (!search) {
      throw new BadRequestException('Search query (q) is required');
    }
  
    if (!language) {
      throw new BadRequestException('Language (lang) is required');
    }
  
    if (!['fr', 'en', 'ar'].includes(language)) {
      throw new BadRequestException('Invalid language code');
    }
  
    const addresses = await this.findAddresses(search, language);
    
    // Extract relevant fields for the specified language
    const filteredAddresses = addresses.map(address => ({
    
      address_code: address.address_code,
      ...address[language]
    }));
  
    return filteredAddresses;
  }
  
  
}
