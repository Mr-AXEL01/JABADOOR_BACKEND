// address.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AddressDetails } from 'src/address/interfaces/address.interface';

export type AddressDocument = Address & Document;

@Schema()
export class Address {
  @Prop({ required: true, default: () => Date.now().toString(36) })
  address_code: string;

  @Prop({ required: true, type: Object }) // Add type: Object here
  fr: AddressDetails;

  @Prop({ required: true, type: Object }) // Add type: Object here
  en: AddressDetails;

  @Prop({ required: true, type: Object }) // Add type: Object here
  ar: AddressDetails;

   
    // @Prop({ type: Types.ObjectId })
    // _id: Types.ObjectId;
  
}

export const AddressSchema = SchemaFactory.createForClass(Address);
