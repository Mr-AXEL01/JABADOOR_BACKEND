import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorieService } from './categories.service';
import { CategorieController } from './categories.controller';


import { Categorie, CategorieSchema } from 'schemas/category.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

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

