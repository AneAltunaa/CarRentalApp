import React from "react";
import { View, StyleSheet, FlatList } from 'react-native';
import CarCard from "../components/CarCard";
import { CARS } from "../data/cars";

const CarListScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
              data={CARS} // use our dummy data array
              renderItem={({ item }) => <CarCard car={item} />} // tell FlatList how to render each item
              keyExtractor={item => item.id} // give each item a unique key
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