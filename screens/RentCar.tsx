import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import CarDetails from '../components/CarDetails';
import { Calendar , CalendarProps } from 'react-native-calendars';
import RentCalendar from '../components/RentCalendar';

import { View, StyleSheet, ScrollView, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';

type RentCarRouteProp = RouteProp<RootStackParamList, 'RentCar'>;

const RentCar = () => {
  const route = useRoute<RentCarRouteProp>();
  const { car } = route.params;

  const [showDetails, setShowDetails] = useState(false);
  return (
    <ScrollView>
        <View style={styles.cardContainer}>
            <Text style={styles.title}>{car.name}</Text>
            <Image source={{ uri: car.image }} style={{ width: 300, height: 200 }} />

            <View style={styles.bottomRow}>
                <Text style={styles.price}>{car.price} € / day</Text>
                <TouchableOpacity
                    onPress={() => setShowDetails(!showDetails)}>
                    <Text style={styles.details}>
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </Text>
                    
                </TouchableOpacity>
                
            </View>
            {showDetails && <CarDetails car={car} />}
            <RentCalendar />
            <TouchableHighlight style={styles.rentButtoon }
                onPress={() =>{}}>
                <Text style={styles.rental}>
                    Confirm Rental
                </Text>
            </TouchableHighlight>
        </View>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        borderColor: 'blue',
        borderWidth: 1.5,
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
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 20,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    rentButtoon: {
        backgroundColor: 'blue',
        borderRadius: 15,
        width: 150,
        alignSelf: 'flex-end'
    },
    rental: {
        color: 'white',
        padding: 10,
        fontSize: 18,
        alignSelf: 'center',
    }
});
export default RentCar;