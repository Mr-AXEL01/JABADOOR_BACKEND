// address.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AddressDetails } from 'src/address/interfaces/address.interface';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ required: true, type: Object }) // Add type: Object here
  fr: AddressDetails;

  @Prop({ required: true, type: Object }) // Add type: Object here
  en: AddressDetails;

  @Prop({ required: true, type: Object }) // Add type: Object here
  ar: AddressDetails;
  
}

export const AddressSchema = SchemaFactory.createForClass(Address);
