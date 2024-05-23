import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Translation } from 'src/address/interfaces/translation.interface';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true, type: Object })
  translations: {
    fr: Translation;
    ar: Translation;
  };
}

export const AddressSchema = SchemaFactory.createForClass(Address);
