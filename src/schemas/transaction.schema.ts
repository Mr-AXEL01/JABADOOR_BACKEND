import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TransactionDocument = Transaction & Document;

class Host {
  @Prop({ required: true })
  host_code: string;

  @Prop({ required: true })
  host_price_per_night: number;

  @Prop({ required: true })
  quantity: number;
}

@Schema()
export class Transaction {
  @Prop({ required: true, unique: true })
  transaction_code: string;

  @Prop({ required: true })
  user_code: string;

  @Prop({ required: true })
  logement_code: string;

  @Prop({ type: [Host], required: true })
  host_list: Host[];

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
