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
        image: 'https://prod.cosy.bmw.cloud/bmwweb/cosySec?COSY-EU-100-7331cqgv2Z7d%25i02uCaY3MuO2kOHUtWPfbYf6JZv10tLhu1XzWVo7puMLWFmdkAj5DOPifo%25Z8XgY1nTNIowJ4HO3zkyXq%25sGM8snpq6v6ODubLz2aKqfUKTjmB2fJj5DOP5Eagd%25kcWExHWpbl8FO2k3Hy2o242dnTQBrXpF72BlZ24riIikascpF4Hv5GA0KiIFJG8YAABHvIT9PgWO2JGvloMjegpT9GsLD6BUilo90ya7wbHsLoACRwShJ0yLOExguqTACygNWOomlOECUkwb17sgNEbn%25NL10UkNh5ukDVAbnkq8wpgzOh5nmP%25Eaagq857MrJfRUmP81D4TWxb7MPVYFZsWh1DMztIW8eqVYDafv42jmztYRSDtb67aftxdYfsw1RSfWQtZu%25VxdSeZfF2uzWQdjcSI73aeZQ6Kdv6osPGNF9OALU0MSkIogOybADgnvLUgChOrC5GybUEqg4k89ChbNmtpOPoEqhk7frDMLNmqn1Sd5Dyk7m5VdQoYCn178zQZJtE5V1PaZcQfN8zVMRcKYSkPazDxKBZdnMRaYWB4cQ5DxRte2FyZ8YWxfjpw3QmlOECUk9vlqVdgpT9GsLmzbUilo90y7rvbHsLoAC141hJ0yLOEAGGqTACygNO%25mmlOECUkgta7sYEx%25anCpLXjNYPox9syh3b4gZciC',
    },
    {
        id: '2',
        name: 'BMW Serie 2',
        price: 100,
        image: 'https://www.bmw.co.za/content/dam/bmw/common/all-models/m-series/series-overview/bmw-m-series-m2-coupe.png',
    },
    {
        id: '3',
        name: 'BMW Serie 1',
        price: 100,
        image: 'https://imgcdn.zigwheels.pk/large/gallery/color/2/18/bmw_1-series_black_saphhire.jpg',
    },
    {   id: '4', 
        name: 'Audi A3', 
        price: 90, 
        image: 'https://carasti.com/_next/image?url=https%3A%2F%2Fcarasti-operations.s3.ap-south-1.amazonaws.com%2Fuser-documents%2F1736860228Image_14_01_2025_at_5.10___PM.jpeg&w=3840&q=75'
    },
    {   id: '5', 
        name: 'Audi A4', 
        price: 110, 
        image: 'https://img.autocarindia.com/mmv_images/colors/20250527015856_Audi_A4_Mythos_Black_Metallic[1].png?w=728&q=75'
    },
    {   id: '6', 
        name: 'Audi A6',    
        price: 130, 
        image: 'https://crdms.images.consumerreports.org/c_lfill,w_768,q_auto,f_auto/prod/cars/chrome/white/2016AUC020001_1280_01' 
    },
]