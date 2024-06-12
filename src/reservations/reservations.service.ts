import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation, ReservationDocument } from '../schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
  ) {}

  async findValidReservationDatesByHostCode(host_code: string): Promise<{ check_in_date: Date, check_out_date: Date }[]> {
    return this.reservationModel
      .find({ host_code, status: 'valid' })
      .select('check_in_date check_out_date -_id')  // Select only the dates, exclude _id
      .exec();
  }
  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { reservation_code } = createReservationDto;

    // be sure that the reservation_code is unique 
    const existingReservation = await this.reservationModel.findOne({ reservation_code }).exec();
    if (existingReservation) {
      throw new ConflictException('Reservation code must be unique');
    }

    const createdReservation = new this.reservationModel(createReservationDto);
    return createdReservation.save();
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservationModel.find().exec();
  }


}
