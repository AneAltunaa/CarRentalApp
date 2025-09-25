// navigation/TabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import our screen components
import CarListScreen from '../screens/CarListScreen';
import LocationScreen from '../screens/LocationScreen';
import Cart from '../screens/CartScreen';
import Bookings from '../screens/Bookings';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        // We will move the styling options to the Stack Navigator later
        headerShown: false, // This hides the header for all tab screens
        tabBarActiveTintColor: '#6A1B9A',
      }}
    >
      <Tab.Screen name="Home" component={CarListScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Bookings" component={Bookings} />
    </Tab.Navigator>
  );
};

export default TabNavigator;