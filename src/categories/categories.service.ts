import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategorieDto } from './dto/create-categorie.dto';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Categorie, CategorieDocument } from 'src/schemas/category.schema';


@Injectable()
export class CategorieService {
  constructor(
    @InjectModel(Categorie.name) private categorieModel: Model<CategorieDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category_code, image, ar, fr, en, type_service, status, added_date } = createCategoryDto;

    // Upload image to Cloudinary
    const uploadedImage = await this.cloudinaryService.uploadImage(image, 'Categories');

    const createdCategory = new this.categoryModel({
      category_code,
      image: uploadedImage.secure_url,
      ar,
      fr,
      en,
      type_service,
      status,
      added_date,
    });

    return createdCategory.save();
  }

  async findAll(): Promise<Categorie[]> {
    return this.categorieModel.find().exec();
  }
}
