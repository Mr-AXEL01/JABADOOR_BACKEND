import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category extends Document {
  @Prop({ required: true, unique: true, default: () => Date.now().toString(36) })
  category_code: string;

  @Prop({ required: true })
  image: string;


  @Prop( 
    raw({
      name: { type: String, unique: true },
    }) 
  ) 
  ar: Record<string , any>;

  @Prop(
    raw({
      name: { type: String, unique: true },
    }))
  fr: Record<string , any>;

  @Prop(
    raw({
      name: { type: String, unique: true },
    }))
  en: Record<string , any>;

  
  @Prop({ required: true })
  type_service: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  added_date: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
