// data/cars.ts

// Define the 'type' or 'shape' of a single car object.
export interface Car {
  id: string;
  name: string;
  price: number;
  image: string;
}

//fetch from backend
export const getCars = async (): Promise<Car[]> => {
  try {
    const response = await fetch('http://10.0.2.2:5000/cars'); // android emulator
    const data = await response.json();

    const cars: Car[] = data.map((car: any) => ({
      id: String(car.id),
      name: car.name,
      price: car.price,
      image: car.image,
      engine: car.engine,
      model: car.model,
      year: car.year,
      power: car.power,
      transmission: car.transmission,
    }));

    return cars;
  } catch (err) {
    console.error("Error downloading cars data:", err);
    return [];
  }
};
