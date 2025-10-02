import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import CarCard from '../components/CarCard';
import { getCars, Car } from '../data/cars';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function CarListScreen() {
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadCars = async () => {
    try {
      const data = await getCars();
      setCars(data);
      console.log(`Loaded ${data.length} available cars`);
    } catch (error) {
      console.error('Error loading cars:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  // Refresh data every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadCars();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCars();
    setRefreshing(false);
  };

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
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#2196f3']}
          tintColor="#2196f3"
        />
      }
    />
  );
}

