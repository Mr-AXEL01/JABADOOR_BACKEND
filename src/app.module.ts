import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AmenitiesModule } from './amenities/amenities.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://MrAxel-01:3GqpiUBaO5NAkh6g@mraxel-01.fb1qxgu.mongodb.net/JABADOOR?retryWrites=true&w=majority'), AmenitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
