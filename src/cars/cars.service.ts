import { BadRequestException, Injectable, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { Car } from './interfaces/cars.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';
import { log } from 'console';
@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
    ];

    findAll() {
        return this.cars;
    }


    findByID(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    create(createCarDto: CreateCarDto) {

        const car: Car = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push(car);
        return car;
    }

    update( id: string, updateCarDto: UpdateCarDto ) {
        if( updateCarDto.id && updateCarDto.id !== id ) 
            throw new BadRequestException(`Car ID is NOT valid inside body`)

        let carDB = this.findByID( id );

        this.cars = this.cars.map(car => {

            if (car.id === id) {
                carDB = {...carDB,...updateCarDto,id }
                return carDB;
            }

            return car;

        })
        
        return carDB; //carro actualizado
    
    }

    
    delete ( id: string ) { 

        const carDelete = this.findByID ( id );
        this.cars = this.cars.filter( car => car.id !== id);
        
    }
}
