import React from "react";
import { View, Button, StyleSheet, FlatList , Text} from 'react-native';
import CarCard from "../components/CarCard";
import { CARS } from "../data/cars";
import { useNavigation } from '@react-navigation/native';

const CarListScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <FlatList
            data={CARS} // use our dummy data array
            keyExtractor={item => item.id} 
            renderItem={({ item }) => (
            <CarCard 
            car={item}
            onRent={() => navigation.navigate('RentCar',{ car: item})} 
            /> )}// tell FlatList how to render each item
            
            // give each item a unique key
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        //flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default CarListScreen;