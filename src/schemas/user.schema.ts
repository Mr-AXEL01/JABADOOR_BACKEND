// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';
import { SocialMedia } from 'src/user/user.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  user_code: string;

  @Prop({ required: true })
  user_name: string;

  @Prop()
  avatar?: string;

  @Prop()
  bio?: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  birthdate: string;

  @Prop({ required: true, type: Object })
  address: Address;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  gsm: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  language_default: string;

  @Prop({ required: true })
  rate: number;

  @Prop({ required: true })
  count_rate: number;

  @Prop({ required: true })
  added_date: Date;

  @Prop()
  become_creator?: string;

  @Prop({ required: true })
  type_service: string;

  @Prop()
  wishlistid?: string;

  @Prop({ required: true, type: Object })
  social_media: SocialMedia;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
