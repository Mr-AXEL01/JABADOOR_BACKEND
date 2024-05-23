import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category, CategorieDocument } from 'src/schemas/category.schema';


@Injectable()
export class CategorieService {
  constructor(
    @InjectModel(Category.name) private categorieModel: Model<CategorieDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCategoryDto: createCategoryDto): Promise<Category> {

    const { category_code, image, ar, fr, en, type_service, status, added_date } = createCategoryDto;
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

  async findAll(lang: string = 'en'): Promise<any[]> {
    // let's set a default language 
    const lang = req.query.lang || 'en';

    const categories = await this.categoryModel.find().exec();

    return categories.map(category => {
      return {
        _id: category._id,
        category_code: category.category_code,
        image: category.image,
        // we should return one object of name depends on the language that the client is requesting
        name: category[lang].name,
        type_service: category.type_service,
        status: category.status,
        added_date: category.added_date,
      };
    });
  }
}
