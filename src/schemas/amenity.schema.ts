import { Schema, Prop, raw, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum AmenityType {
  Services = "Services",
  ParkingAndFacilities = "Parking and facilities",
  Outdoor = "Outdoor",
  LocationFeatures = "Location features",
  KitchenAndDining = "Kitchen and dining",
  InternetAndOffice = "Internet and office",
  PrivacyAndSafety = "Privacy and safety",
  HeatingAndCooling = "Heating and cooling",
  Family = "Family",
  Entertainment = "Entertainment",
  BedroomAndLaundry = "Bedroom and laundry",
  Bathroom = "Bathroom",
  ScenicViews = "Scenic views",
}

export type AmenityDocument = Amenity & Document;

@Schema()
export class Amenity extends Document {

  @Prop({ required: true, default: () => Date.now().toString(36) })
  amenity_code: string;

  @Prop({ required: true, enum: AmenityType })
  type: string;

  @Prop({ required: false })
  icon?: string;

  @Prop({ required: false })
  svg?: string;

  @Prop(
    raw({
      name: { type: String, unique: true },
    })
  )
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
