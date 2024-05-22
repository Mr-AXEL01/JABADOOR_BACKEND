import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LogementService } from './logement.service';
import { CreateLogementDto } from './dto/create-logement.dto';

@Controller('logements')
export class LogementController {
  constructor(private readonly logementService: LogementService) {}

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
