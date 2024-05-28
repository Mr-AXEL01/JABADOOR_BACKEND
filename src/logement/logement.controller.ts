import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LogementService } from './logement.service';
import { CreateLogementDto } from './dto/create-logement.dto';
import { Logement } from 'src/schemas/logement.schema';

@Controller('logements')
export class LogementController {
  constructor(private readonly logementService: LogementService) {}




  @Get('filter')
  async findByFilters(
    @Query('amenitiesIds') amenitiesIds: string | string[],
    @Query('category_code') category_code: string,
    @Query('minPrice') minPrice: string,
    @Query('maxPrice') maxPrice: string
  ): Promise<Logement[]> {
    const amenitiesArray = Array.isArray(amenitiesIds) ? amenitiesIds : [amenitiesIds];
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    return this.logementService.findByFilters(amenitiesArray, category_code, min, max);
  }
  @Post()
  async create(@Body() createLogementDto: CreateLogementDto) {
    return this.logementService.create(createLogementDto);
  }

  // @Post('many')
  // async createMany(@Body() createLogementDtos: CreateLogementDto[]) {
  //   return this.logementService.createMany(createLogementDtos);
  // }

  @Get()
  async findAll(@Query('lang') language?: string) {
    return this.logementService.findAll(language);
  }
}
