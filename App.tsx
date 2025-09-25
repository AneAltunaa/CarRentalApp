import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
import login from './login';
import register from './register';
import Home from './Home';
import CarListScreen from './screens/CarListScreen';
import React from 'react';
import forgotPass from './forgotPass';
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './navigation/TabNavigation';

import { Database } from "./database";

const Stack = createNativeStackNavigator();

export default function App() {
  return (

    <NavigationContainer>
      
      <Stack.Navigator
        // Options for the entire stack navigator's header
        initialRouteName='Home'
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f8f8f8', // A light background for the header
          },
          headerShadowVisible: false, // Remove the line under the header
        }}
      >

        <Stack.Screen
        name='Home'
        component={Home}
        options={{headerShown:false}
        }
        />
        <Stack.Screen
        name='login'
        component={login}
        options={{headerShown:false}
        }
        />
        <Stack.Screen
        name='register'
        component={register}
        options={{headerShown:false}
        }
        />
        <Stack.Screen
        name='forgotPass'
        component={forgotPass}
        options={{headerShown:false}
        }
        />


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

