import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterController } from './filter.controller';
import { FilterService } from './filter.service';
import { Filter, FilterSchema } from 'src/schemas/filter.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Filter.name, schema: FilterSchema }]),
  ],
  controllers: [FilterController],
  providers: [FilterService],
})
export class FilterModule {}
