import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/schemas/category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async findAll(@Query('lang') lang: string): Promise<any[]> {
    return this.categoryService.findAll(lang);
  }

  @Post('bulk')
  async createMultiple(@Body() createCategoryDtos: CreateCategoryDto[]): Promise<Category[]> {
    return this.categoryService.createMultiple(createCategoryDtos);
  }
}
