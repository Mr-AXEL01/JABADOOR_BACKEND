import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true, default: () => Date.now().toString(36) })
  category_code: string;

  @Prop({ required: true })
  image: string;

  @Prop({
    required: true,
    type: { name: String },
    _id: false // Exclude _id from subdocument
  })
  ar: { name: string };

  @Prop({
    required: true,
    type: { name: String },
    _id: false // Exclude _id from subdocument
  })
  fr: { name: string };

  @Prop({
    required: true,
    type: { name: String },
    _id: false // Exclude _id from subdocument
  })
  en: { name: string };
  
  @Prop({ required: true })
  type_service: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  added_date: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
