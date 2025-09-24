import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
 // Import the 'Car' type from our data file
 import { Car } from '../data/cars';

 // Define the type for the props this components will receive
 // It expects a single prop named 'car' of type 'Car'
 interface CarCardProps {
    car: Car;
 }

 // This is the CarCard component
 // It uses destrucuring to get the 'car' object directly from prps
 const CarCard: React.FC<CarCardProps> = ({ car }) => {
    return (
        <View style={styles.cardContainer}>
            {/* Car Title */}
            <Text style={styles.title}>{car.name}</Text>

            {/* Car Image */}
            <Image source={{ uri: car.image }} style={styles.image} />

            {/* More information link */}
            <Text style={styles.infoLink}>More Information</Text>

            {/* Bottom row containing price and button */}
            <View style={styles.bottomRow}>
                <Text style={styles.price}>{car.price} € / day</Text>
                <Button title="Rent" onPress={() => alert('Rent button pressed!')} />
            </View>
        </View>
    );
 };

// define the styles for te component
const styles = StyleSheet.create({
    cardContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
        marginBottom: 10,
    },
    infoLink: {
        color: '#800080',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '500',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

// Export the component so it can be used in other files
export default CarCard;