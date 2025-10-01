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
    }));

    return cars;
  } catch (err) {
    console.error("Błąd przy pobieraniu aut:", err);
    return [];
  }
};
