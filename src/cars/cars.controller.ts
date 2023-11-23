import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { ValidationTypes } from 'class-validator';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) { }

    private cars = ['Toyota', 'Honda', 'Jeep']
    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        console.log({ id });

        return this.carsService.findByID(id);
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.create(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto) {
            return this.carsService.update( id, updateCarDto );
        }

    @Delete(':id')
    deleteteCar(@Param('id', ParseUUIDPipe) id) {
        return this.carsService.delete( id );
    }
}