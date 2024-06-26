import { Controller, Post, Body, Get, Query, NotFoundException, Param } from '@nestjs/common';
import { Host } from 'src/schemas/host.schema';
import { CreateHostDto } from './dto/create-host.dto';
import { HostService } from './host.service';

@Controller('Hosts')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post()
  async create(@Body() createHostDto: CreateHostDto) {
    return this.hostService.create(createHostDto);
  }

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
    @Query('lang') language?: string
  ): Promise<Host[]> {
    const amenitiesArray = amenitiesIds ? (Array.isArray(amenitiesIds) ? amenitiesIds : [amenitiesIds]) : [];
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;
    const adultsCount = adults ? parseInt(adults) : undefined;
    const childrenCount = children ? parseInt(children) : undefined;

    return this.hostService.findByFilters(
      amenitiesArray, 
      category_code, 
      min, 
      max, 
      checkInDate, 
      checkOutDate, 
      adultsCount, 
      childrenCount, 
      addressCode, 
      language
    );
  }

  @Get('count-available')
  async countAvailableHosts(
    @Query('checkInDate') checkInDate: string,
    @Query('checkOutDate') checkOutDate: string,
    @Query('addressCode') addressCode: string,
    @Query('adults') adults?: number,
    @Query('children') children?: number
  ): Promise<number> {
    return this.hostService.countAvailableHosts(checkInDate, checkOutDate, addressCode, adults, children);
  }

  @Get('search')
  async searchHosts(@Query('query') query: string): Promise<Host[]> {
    return this.hostService.searchHost(query);
  }

  @Get()
  async findAll(@Query('lang') language?: string) {
    return this.hostService.findAll(language);
  }

  @Get(':hostCode')
  async findByHostCode(
    @Param('hostCode') hostCode: string,
    @Query('lang') language?: string
  ) {
    const host = await this.hostService.findByHostCode(hostCode, language);
    if (!host) {
      throw new NotFoundException(`Host with code ${hostCode} not found`);
    }
    return host;
  }
}
