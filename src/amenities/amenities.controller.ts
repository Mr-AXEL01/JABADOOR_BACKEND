import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { AmenityService } from './amenities.service';
import { CreateAmenityDto } from './dto/create-amenity.dto';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post()
  async create(@Body() createAmenityDto: CreateAmenityDto) {
    return this.amenityService.create(createAmenityDto);
  }

  @Get()
  async findAll(@Query('lang') lang: string) { 
    return this.amenityService.findAll(lang);
  }
}
