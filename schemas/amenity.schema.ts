import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AmenityDocument = HydratedDocument<Amenity>;

@Schema()
export class Amenity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon: string;

  @Prop({
    type: Object,
    of: String,
    required: true,
    _id: false
  })
  translations: {
    fr?: string;
    ar?: string;
  };
}

export const AmenitySchema = SchemaFactory.createForClass(Amenity);
