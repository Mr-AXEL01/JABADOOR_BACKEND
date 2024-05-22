import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorieService } from './categories.service';
import { CategorieController } from './categories.controller';


import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { Categorie, CategorieSchema } from 'schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Categorie.name, schema: CategorieSchema }]),
    CloudinaryModule
  ],
  controllers: [CategorieController],
  providers: [CategorieService ],
  exports: [MongooseModule], 
})
export class CategorieModule {}

