import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { AmenityService } from './amenities.service';
import { AmenityDto, CreateAmenitiesDto } from './dto/create-amenity.dto';

@Controller('amenities')
export class AmenityController {
  constructor(private readonly amenityService: AmenityService) {}

  @Post()
  async create(@Body() createAmenityDto: AmenityDto) {
    return this.amenityService.create(createAmenityDto);
  }

  @Post('bulk')
  async createMany(@Body() createAmenitiesDto: CreateAmenitiesDto) {
    return this.amenityService.createMany(createAmenitiesDto);
  }

  @Get()
  async findAll(@Query('lang') lang: string) { 
    return this.amenityService.findAll(lang);
  }
}
