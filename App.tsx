// App.tsx

import React from 'react';
import { Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigation';

// Create a tool for stack navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // Options for the entire stack navigator's header
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f8f8', // A light background for the header
          },
          headerShadowVisible: false, // Remove the line under the header
        }}
      >
        {/* The main screen of our stack is the entire TabNavigator */}
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          // Options for this specific screen's header
          options={{
            headerTitle: () => (
              // Display the app name with custom styling
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>GoCar</Text>
            ),
            headerRight: () => (
              // Display a button on the right side
              <Button
                onPress={() => alert('Profile button pressed!')}
                title="Profile" // Using text as a placeholder for the icon
              />
            ),
          }}
        />
        {/* We can add other screens like a real Profile screen here later */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}