import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {

  @Prop({ required: true })
  category_code: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  ar: { name: string };

  @Prop()
  fr: { name: string };

  @Prop()
  en: { name: string };

  @Prop({ required: true })
  type_service: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  added_date: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
