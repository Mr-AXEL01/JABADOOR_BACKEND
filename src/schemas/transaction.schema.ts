import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Reservation } from './reservation.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true, unique: true })
  transaction_code: string;

  @Prop({ type: Types.ObjectId, ref: 'Reservation', required: true })
  reservation: Types.ObjectId;

  @Prop({ required: true })
  total_amount_HT: number;

  @Prop({ required: true })
  tva_amount: number;

  @Prop({ required: true })
  total_amount_TTC: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  method_payment: string;

  @Prop({ required: true })
  type_service: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  added_date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);