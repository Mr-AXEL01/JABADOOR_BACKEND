import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

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
}
