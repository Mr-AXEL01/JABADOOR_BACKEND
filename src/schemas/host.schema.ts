import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Address, AddressSchema } from './address.schema';
import { Category, CategorySchema } from './category.schema';
import { Amenity, AmenitySchema } from './amenity.schema';
import { Translation } from 'src/host/interfaces/translation.interface';

export type HostDocument = Host & Document;

export enum Etat {
  BON = 'Bon état',
  NEUF = 'Neuf',
  A_RENOVER = 'À rénover',
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BANNED = "BANNED"
}

export interface Statics {
  contRatings: number;
  countSaves: number;
  countOrders: number;
  countComments: number;
}

export interface Image {
  public_id: string;
  url: string;
  secure_url: string;
  format: string;
}

@Schema()
export class Host extends Document {
  @Prop({ required: true, unique: true, default: () => Date.now().toString(36) })
  Host_code: string;

  @Prop({ required: true })
  nom: string;

  @Prop({ type: Address, required: true }) // Embed entire Address schema
  address: Address;

  @Prop({ type: Category, required: true }) // Embed entire Category schema
  category: Category;

  @Prop({ required: true })
  telephone: string;

  @Prop()
  bedrooms?: number;

  @Prop()
  About?: string;

  @Prop()
  Rating?: number;

  @Prop()
  baths?: number;

  @Prop({ required: true })
  superficie: string;

  @Prop({ required: true })
  beds: number;

  @Prop({ required: true })
  guests: number;

  @Prop({ required: true, enum: Etat })
  etat: Etat;

  @Prop()
  terrasse?: boolean;

  @Prop()
  garage?: boolean;

  @Prop()
  image: Image[];

  @Prop({ type: String, enum: Object.values(Status) })
  status: Status;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: true })
  valid: boolean;

  @Prop({ required: true })
  price: number;

  @Prop()
  workingTime: string;

  @Prop({ type: Object })
  statics: Statics;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: Object })
  translations: {
    fr: Translation;
    ar: Translation;
  };

  @Prop({ type: [AmenitySchema], default: [] }) // Array of amenities
  amenities: Amenity[];

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;
}

export const HostSchema = SchemaFactory.createForClass(Host);
