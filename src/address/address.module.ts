// address.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from 'src/schemas/address.schema';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [MongooseModule], 
})
export class AddressModule {}
