import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Filter } from 'src/schemas/filter.schema';
import { CreateFilterDto, UpdateFilterDto } from './dto/filter.dto';
import { FilterService } from './filter.service';

@Controller('filters')
export class FilterController {
    constructor(private readonly filterService: FilterService) { }

    @Post()
    create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
        return this.filterService.create(createFilterDto);
    }

    //   @Get()
    //   findAll(): Promise<Filter[]> {
    //     return this.filterService.findAll();
    //   }

    @Get(':filter_code')
    findOne(@Param('filter_code') filter_code: string): Promise<Filter> {
        return this.filterService.findById(filter_code);
    }

    @Put(':filter_code')
    async update(
        @Param('filter_code') filter_code: string,
        @Body() updateFilterDto: UpdateFilterDto,
    ) {
        return this.filterService.update(filter_code, updateFilterDto);
    }
    @Delete(':filter_code')
    remove(@Param('filter_code') filter_code: string): Promise<Filter> {
        return this.filterService.remove(filter_code);
    }
    @Get()
    async findAll(@Query('lang') lang: string = 'en') {
        return this.filterService.findAllByLanguage(lang);
    }
}

