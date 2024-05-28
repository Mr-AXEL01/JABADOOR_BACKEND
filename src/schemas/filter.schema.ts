import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type FilterDocument = Filter & Document;
@Schema()
export class Filter extends Document {
    @Prop({ required: true, unique: true, default: () => Date.now().toString(36) })
    filter_code: string;
  

 

  @Prop({ type: () => Object, name: String, description: String })
  ar: { name: string; description?: string };

  @Prop({ type: () => Object, name: String, description: String })
  fr: { name: string; description?: string };

  @Prop({ type: () => Object, name: String, description: String })
  en: { name: string; description?: string };


  @Prop()
  status: string;

  @Prop()
  added_date: Date;
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
