import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AmenityDocument = Amenity & Document;

@Schema()
export class Amenity extends Document {

  @Prop({ required: true,  default: () => Date.now().toString(36) })
  amenity_code: string;

  @Prop({ required: true })
  icon: string;

  @Prop(
    raw({
    name: { type: String, unique: true },
  }))
  ar: Record<string , any>;

  @Prop(
    raw({
      name: { type: String, unique: true },
    })
  )
  fr: Record<string , any>;

  @Prop(
    raw({
      name: { type: String, unique: true },
    })
  )
  en: Record<string , any>;
  
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);
