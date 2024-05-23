import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category, CategoryDocument } from '../schemas/category.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category_code } = createCategoryDto;

    // be sure that the category_code is unique 
    const existingCategory = await this.categoryModel.findOne({ category_code }).exec();
    if (existingCategory) {
      throw new ConflictException('Category code must be unique');
    }

    const uploadedImage = await this.cloudinaryService.uploadImage(createCategoryDto.image, 'Categories');

    const createdCategory = new this.categoryModel({
      ...createCategoryDto,
      image: uploadedImage.secure_url,
    });

    return createdCategory.save();
  }

  async findAll(lang: string = 'en'): Promise<any[]> {
    const categories = await this.categoryModel.find().exec();

    return categories.map(category => {
      let name;
      // Return name based on the language that the client is requesting
      switch (lang) {
        case 'ar':
          name = category.ar.name;
          break;
        case 'fr':
          name = category.fr.name;
          break;
        case 'en':
        default:
          name = category.en.name;
          break;
      }
      return {
        _id: category._id,
        category_code: category.category_code,
        image: category.image,
        name: name,
        type_service: category.type_service,
        status: category.status,
        added_date: category.added_date,
      };
    });
  }
}
