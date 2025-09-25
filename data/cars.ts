// data/cars.ts

// Define the 'type' or 'shape' of a single car object.
export interface Car {
    id: string;
    name: string;
    price: number;
    image: string;
}

// Create and export an array of car objects using the defined 'Car' type.
export const CARS: Car[] = [
    {
        id: '1',
        name: 'BMW Serie 3',
        price: 100,
        image: '',
    },
    {
        id: '2',
        name: 'BMW Serie 2',
        price: 100,
        image: '',
    },
    {
        id: '3',
        name: 'BMW Serie 1',
        price: 100,
        image: '',
    }
]