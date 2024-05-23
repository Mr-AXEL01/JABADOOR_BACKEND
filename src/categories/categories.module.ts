import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';


import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Category, CategorySchema } from 'src/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    CloudinaryModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService ],
  exports: [MongooseModule], 
})
export class CategoryModule {}

