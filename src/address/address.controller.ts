import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, Query, BadRequestException } from '@nestjs/common';
import { AddressService } from './address.service';

import { AddressDetails } from './interfaces/address.interface';
import { Address } from 'src/schemas/address.schema';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() body: { fr: AddressDetails, en: AddressDetails, ar: AddressDetails }): Promise<Address> {
    return this.addressService.createAddress(body.fr, body.en, body.ar);
  }

  @Post('many')
  async createMany(@Body() body: { addresses: { fr: AddressDetails, en: AddressDetails, ar: AddressDetails }[] }): Promise<Address[]> {
    return this.addressService.createAddresses(body.addresses);
  }

  @Get()
  async findAll(@Query('lang') lang: string = 'en'): Promise<Address[]> {
    return this.addressService.findAllAddresses(lang);
  }

  @Get('search')
  async searchAddresses(
    @Query('q') search: string,
    @Query('lang') language: string
  ): Promise<Address[]> {
    return this.addressService.searchAddresses(search, language);
  }
  

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Address> {
    return this.addressService.findAddressById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: { fr: AddressDetails, en: AddressDetails, ar: AddressDetails }): Promise<Address> {
    return this.addressService.updateAddress(id, body.fr, body.en, body.ar);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Address> {
    return this.addressService.deleteAddress(id);
  }
}
