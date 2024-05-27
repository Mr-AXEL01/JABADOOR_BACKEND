import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Filter, FilterDocument } from 'src/schemas/filter.schema';
import { CreateFilterDto, UpdateFilterDto } from './dto/filter.dto';

@Injectable()
export class FilterService {
    constructor(
        @InjectModel(Filter.name) private filterModel: Model<FilterDocument>,
    ) { }

    async create(createFilterDto: CreateFilterDto): Promise<Filter> {
        const createdFilter = new this.filterModel(createFilterDto);
        return createdFilter.save();
    }

    async findAll(): Promise<Filter[]> {
        return this.filterModel.find().exec();
    }




    async findById(filter_code: string): Promise<Filter> {
        return this.filterModel.findOne({filter_code}).exec();
    }

 
    async update(filter_code: string, updateFilterDto: UpdateFilterDto): Promise<Filter> {
        return this.filterModel.findOneAndUpdate({ filter_code }, updateFilterDto, {
          new: true,
        }).exec();
      }

    async remove(filter_code: string): Promise<Filter> {
        return this.filterModel.findOneAndDelete({filter_code});
    }


  
    async findAllByLanguage(language: string = 'en'): Promise<any[]> {
        const filters = await this.filterModel.find({ status: 'A' }).exec();
        return filters.map(filter => {
          const { filter_code, status, added_date } = filter;
          return {
            filter_code,
         
            status,
            added_date,
            name: filter[language]?.name || filter.en.name,
            description: filter[language]?.description || filter.en.description,
          };
        });
      }
}

