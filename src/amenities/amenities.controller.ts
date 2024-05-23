import { Controller, Post, Body, Get, Query, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AmenitiesService } from './amenities.service';
<<<<<<< HEAD
import { Amenity } from '../schemas/amenity.schema';
import { Express } from 'express';
=======
import { Amenity } from '../../schemas/amenity.schema';
>>>>>>> 7f9626e36b5d5f5901ed669cc232ecb024ba4a7f

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
