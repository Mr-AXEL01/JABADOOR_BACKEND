import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionDocument } from '../schemas/transaction.schema';
import { Reservation, ReservationDocument } from '../schemas/reservation.schema';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    const { transaction_code } = createTransactionDto;

    // be sure that the transaction_code is unique 
    const existingTransaction = await this.transactionModel.findOne({ transaction_code }).exec();
    if (existingTransaction) {
      throw new ConflictException('transaction code must be unique');
    }

    const reservation = await this.reservationModel.findById(createTransactionDto.reservation).exec();
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${createTransactionDto.reservation} not found`);
    }

    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionModel.find().populate('reservation').exec();
  }

  async findOne(id: string): Promise<Transaction> {
    const transaction = await this.transactionModel.findById(id).populate('reservation').exec();
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return transaction;
  }

}
