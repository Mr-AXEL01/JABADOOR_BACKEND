import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AmenityDocument = Amenity & Document;

@Schema()
export class Amenity extends Document {

  @Prop({ required: true })
  icon: string;

  @Prop({
    required: true,
    type: { name: String },
    _id: false // Exclude _id from subdocument
  })
  ar: { name: string };

  @Prop({
    required: true,
    type: { name: String },
    _id: false 
  })
  fr: { name: string };

  @Prop({
    required: true,
    type: { name: String },
    _id: false 
  })
  en: { name: string };
  
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);
