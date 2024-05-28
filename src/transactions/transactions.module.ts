import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { Transaction, TransactionSchema } from '../schemas/transaction.schema';
import { Reservation, ReservationSchema } from '../schemas/reservation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
      { name: Reservation.name, schema: ReservationSchema },
    ])
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
