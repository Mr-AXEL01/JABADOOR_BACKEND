import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import { Host } from 'src/schemas/host.schema';
import { CreateHostDto } from './dto/create-host.dto';
import { HostService } from './Host.service';

@Controller('Hosts')
export class HostController {
  constructor(private readonly HostService: HostService) {}




  @Get('filter')
  async findByFilters(
    @Query('amenitiesIds') amenitiesIds: string | string[],
    @Query('category_code') category_code: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string
  ): Promise<Host[]> {
    const amenitiesArray = Array.isArray(amenitiesIds) ? amenitiesIds : [amenitiesIds];
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    return this.HostService.findByFilters(amenitiesArray, category_code, min, max);
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
}