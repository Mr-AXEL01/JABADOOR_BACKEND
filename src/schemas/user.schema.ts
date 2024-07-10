// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address } from './address.schema';
import { SocialMedia } from 'src/user/user.interface';

export type UserDocument = User & Document;

class WishlistItem {
  @Prop({ required: true })
  Host_code: string;

  @Prop({ required: true })
  wishadded_date: Date;
}

@Schema()
export class User {
  @Prop({ unique: true, default: () => Date.now().toString(36) })
 
  user_code: string;

  @Prop()
  user_name: string;

  @Prop()
  image?: string;

  @Prop()
  bio?: string;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  gender: string;

  @Prop()
  birthdate: string;

  @Prop()
  status: string;

  @Prop()
  gsm: string;

  @Prop()
  email: string;

  @Prop()
  language_default: string;

  @Prop()
  rate: number;

  @Prop()
  count_rate: number;

  @Prop()
  added_date: Date;

  @Prop()
  become_creator?: string;

 


  @Prop({type: Object })
  social_media: SocialMedia;

  @Prop()
  password: string;

  @Prop({ type: [WishlistItem], default: [] })
  wishlist: WishlistItem[];
}

export const UserSchema = SchemaFactory.createForClass(User);




