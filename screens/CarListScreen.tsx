import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import CarCard from '../components/CarCard';
import { getCars, Car } from '../data/cars';
import { useNavigation } from '@react-navigation/native';

export default function CarListScreen() {
  const navigation = useNavigation();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars().then((data) => {
      setCars(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <FlatList
      data={cars}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <CarCard
          car={item}
          onRent={() => navigation.navigate('RentCar', { car: item })}
        />
      )}
      contentContainerStyle={{ padding: 10 }}
    />
  );
}

