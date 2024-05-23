import { Controller, Post, Body, Get, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AmenitiesService } from './amenities.service';
import { Amenity } from '../schemas/amenity.schema';
@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  async create(@Body() amenity: Amenity) {
    return this.amenitiesService.create(amenity, amenity.icon);
  }

  @Get()
  async findAll(@Query('language') language?: string) { 
    return this.amenitiesService.findAll(language);
  }
}
