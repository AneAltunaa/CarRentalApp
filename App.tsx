import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import login from './login';
import register from './register';
import Home from './Home';
import CartScreen from './screens/CartScreen';
import CarListScreen from './screens/CarListScreen';
import LocationScreen from './screens/LocationScreen';
import Cart from './screens/CartScreen';
import Bookings from './screens/Bookings';
import React from 'react';
import ForgotPass from './forgotPass';
import {createStaticNavigation, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'
import RentCar from './screens/RentCar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserProfile from './screens/UserProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CarStack = createNativeStackNavigator();


const CarStackNavigator = () => {
  return (
    <CarStack.Navigator>
      <CarStack.Screen
        name="CarList"
        component={CarListScreen}
        options={({ navigation }) => ({
          title: 'Cars',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
          headerLeft: () => (
          <TouchableOpacity
            style={{
              marginLeft: 10,
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: 'black',
              borderRadius: 8,
            }}
            onPress={async () => {
              // Καθαρίζουμε τον χρήστη
              await AsyncStorage.removeItem('user');
              // Πάμε στο login και reset stack
              navigation.reset({
                index: 0,
                routes: [{ name: 'login' }],
              });
            }}
          >
            <Text style={{ color: 'blue', fontWeight: 'bold' }}>Logout</Text>
          </TouchableOpacity>
        ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfile')}>
                <Ionicons
                  name="person-circle-outline"
                  size={32}
                  color="black"
                  style={{ marginRight: 10 }}
                />
            </TouchableOpacity>
          ),
        })}
      />
      <CarStack.Screen
        name="RentCar"
        component={RentCar}
        options={{ title: 'Rent a Car', 
          headerLeft: () => null}} // Disable back button
      />
      <CarStack.Screen
        name="CartScreen"
        component={CartScreen} 
        options={{ title: 'My Cart' }}
/>
    </CarStack.Navigator>
  );
};
const CarTabs = () => (
  <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6A1B9A',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="CarsList"
        component={CarStackNavigator}
        options={{
          title: 'Cars',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Location"
        component={LocationScreen}
        options={{
          title: 'Location',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Bookings"
        component={Bookings}
        options={{
          title: 'Bookings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
      // <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#6A1B9A' }}>
      //   <Tab.Screen name="CarsList" component={CarStackNavigator} options={{ title: 'Cars' }} />
      //   <Tab.Screen name="Location" component={LocationScreen} />
      //   <Tab.Screen name="Cart" component={Cart} />
      //   <Tab.Screen name="Bookings" component={Bookings} />
      // </Tab.Navigator>
    );


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
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Back',
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={26}
              color="black"
              style={{ marginLeft: 10 }}
              onPress={() => {  
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
              }}
              />
            ),
          })}
        />  
        <Stack.Screen
        name='register'
        component={register}
        options={{headerShown:true}
        }
        />
        <Stack.Screen
        name='ForgotPass'
        component={ForgotPass}
        options={{headerShown:true}
        }
        />
        
        {/* Main Tabs */}
        <Stack.Screen
          name="CarTabs"
          component={CarTabs}
          options={{ headerShown: false}} // header hidden γιατί κάθε tab έχει δικό του header
        />

        <Stack.Screen
        name='UserProfile'
        component={UserProfile}
        options={{headerShown:false}
        }
        />

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
  backButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    borderRadius: 15,
    paddingHorizontal: 10,
  },
  back: {
      color: 'white',
      padding: 10,
      fontSize: 18,
      alignSelf: 'center',
  }
});

