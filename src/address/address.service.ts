// address.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
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
}
