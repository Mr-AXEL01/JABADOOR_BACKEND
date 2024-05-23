import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Translation } from 'src/logement/interfaces/translation.interface';
 // Import Amenity schema
import { Address, AddressSchema } from './address.schema';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Amenity, AmenitySchema } from './amenity.schema';

export enum Etat {
  BON = 'Bon état',
  NEUF = 'Neuf',
  A_RENOVER = 'À rénover',
  // Add other states as needed
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
export class Logement extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ type: AddressSchema, required: true }) // Embed entire Address schema
  address: Address;

  @Prop({ type: CategorySchema, required: true }) // Embed entire Category schema
  category: Category;

  @Prop({ required: true })
  telephone: string;

  @Prop({ required: true })
  nbrChambres: number;

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
  amenities: Amenity[]; // Define array of amenities
}

export const LogementSchema = SchemaFactory.createForClass(Logement);
