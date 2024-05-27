import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

class Guests {
  @Prop({ required: true })
  adults: number;

  @Prop({ required: true })
  children: number;

  @Prop({ required: true })
  babies: number;
}

@Schema()
export class Reservation {
  @Prop({ required: true, unique: true })
  reservation_code: string;

  @Prop({ required: true })
  user_code: string;

  @Prop({ required: true })
  logement_code: string;

  @Prop({ required: true })
  check_in_date: Date;

  @Prop({ required: true })
  check_out_date: Date;

  @Prop({ required: true })
  number_of_guests: number;

  @Prop({ required: true, type: Guests })
  list_guests: Guests;

  @Prop({ required: true })
  total_amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  added_date: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
