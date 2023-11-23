import { Module } from '@nestjs/common';
import { CarsModule } from './cars/cars.module';
import { CarsController } from './cars/cars.controller';
import { CarsService } from './cars/cars.service';
@Module({
  imports: [CarsModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class AppModule {}
