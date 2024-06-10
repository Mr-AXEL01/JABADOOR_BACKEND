import { Controller, Post, Body, Get, Query, NotFoundException, Param } from '@nestjs/common';

import { Host } from 'src/schemas/host.schema';
import { CreateHostDto } from './dto/create-host.dto';
import { HostService } from './host.service';

@Controller('Hosts')
export class HostController {
  constructor(private readonly HostService: HostService) {}




  // @Get('filter')
  // async findByFilters(
  //   @Query('amenitiesIds') amenitiesIds: string | string[],
  //   @Query('category_code') category_code: string,
  //   @Query('minPrice') minPrice: string,
  //   @Query('maxPrice') maxPrice: string
  // ): Promise<Host[]> {
  //   const amenitiesArray = Array.isArray(amenitiesIds) ? amenitiesIds : [amenitiesIds];
  //   const min = parseFloat(minPrice);
  //   const max = parseFloat(maxPrice);

  //   return this.HostService.findByFilters(amenitiesArray, category_code, min, max);
  // }


  // @Get('filter')
  // async findByFilters(
  //   @Query('amenitiesIds') amenitiesIds?: string | string[],
  //   @Query('category_code') category_code?: string,
  //   @Query('minPrice') minPrice?: string,
  //   @Query('maxPrice') maxPrice?: string,
  //   @Query('check_in_date') checkInDate?: string,
  //   @Query('check_out_date') checkOutDate?: string,
  //   @Query('adults') adults?: string,
  //   @Query('children') children?: string,
  //   @Query('address_code') addressCode?: string
  // ): Promise<Host[]> {
  //   const amenitiesArray = amenitiesIds ? (Array.isArray(amenitiesIds) ? amenitiesIds : [amenitiesIds]) : [];
  //   const min = minPrice ? parseFloat(minPrice) : undefined;
  //   const max = maxPrice ? parseFloat(maxPrice) : undefined;
  //   const adultsCount = adults ? parseInt(adults) : undefined;
  //   const childrenCount = children ? parseInt(children) : undefined;

  //   return this.HostService.findByFilters(amenitiesArray, category_code, min, max, checkInDate, checkOutDate, adultsCount, childrenCount, addressCode);
  // }

  @Get('filter')
async findByFilters(
  @Query('amenitiesIds') amenitiesIds?: string | string[],
  @Query('category_code') category_code?: string,
  @Query('minPrice') minPrice?: string,
  @Query('maxPrice') maxPrice?: string,
  @Query('check_in_date') checkInDate?: string,
  @Query('check_out_date') checkOutDate?: string,
  @Query('adults') adults?: string,
  @Query('children') children?: string,
  @Query('address_code') addressCode?: string,
  @Query('lang') language?: string // New query parameter for language
): Promise<Host[]> {
  const amenitiesArray = amenitiesIds ? (Array.isArray(amenitiesIds) ? amenitiesIds : [amenitiesIds]) : [];
  const min = minPrice ? parseFloat(minPrice) : undefined;
  const max = maxPrice ? parseFloat(maxPrice) : undefined;
  const adultsCount = adults ? parseInt(adults) : undefined;
  const childrenCount = children ? parseInt(children) : undefined;

  return this.HostService.findByFilters(
    amenitiesArray, 
    category_code, 
    min, 
    max, 
    checkInDate, 
    checkOutDate, 
    adultsCount, 
    childrenCount, 
    addressCode, 
    language // Pass language to the service method
  );
}


  @Post()
  async create(@Body() createHostDto: CreateHostDto) {
    return this.HostService.create(createHostDto);
  }

  // @Post('many')
  // async createMany(@Body() createHostDtos: CreateHostDto[]) {
  //   return this.HostService.createMany(createHostDtos);
  // }


  @Get('search')
  async searchHosts(@Query('query') query: string): Promise<Host[]> {
    return this.HostService.searchHost(query);
  }

  @Get()
  async findAll(@Query('lang') language?: string) {
    return this.HostService.findAll(language);
  }

  @Get(':hostCode')
  async findByHostCode(
    @Param('hostCode') hostCode: string,
    @Query('lang') language?: string
  ) {
    const host = await this.HostService.findByHostCode(hostCode, language);
    if (!host) {
      throw new NotFoundException(`Host with code ${hostCode} not found`);
    }
    return host;
  }
}
