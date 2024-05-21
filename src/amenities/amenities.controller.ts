import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AmenitiesService } from './amenities.service';
import { Amenity } from '../../schemas/amenity.schema';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Post()
  async create(@Body() createAmenityDto: Amenity) {
    return this.amenitiesService.create(createAmenityDto);
  }

  @Get()
  async findAll(@Query('language') language?: string) { 
    return this.amenitiesService.findAll(language);
  }
}
