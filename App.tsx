import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button} from 'react-native';
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

import RentCar from './screens/RentCar';
import UserProfile from './screens/UserProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const CarStack = createNativeStackNavigator();


const CarStackNavigator = ({navigation: parentNavigation }) => {
  return (
    <CarStack.Navigator>
      <CarStack.Screen
        name="CarList"
        component={CarListScreen}
        options={({ navigation }) => ({
          title: 'Cars',
          headerLeft: () => (
            <Button title="Back" onPress={() => parentNavigation.navigate('login')} />
          ),
          headerRight: () => (
            <Button title="UserProfile" onPress={() => parentNavigation.navigate('UserProfile')} />
          ),
        })}
      />
      <CarStack.Screen
        name="RentCar"
        component={RentCar}
        options={{ title: 'Rent a Car', headerLeft: () => null}} // Disable back button
      />
      <CarStack.Screen
        name="CartScreen"
        component={CartScreen} // το component της Cart
        options={{ title: 'My Cart' }}
/>
    </CarStack.Navigator>
  );
};
const CarTabs = () => (
      <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#6A1B9A' }}>
        <Tab.Screen name="CarsList" component={CarStackNavigator} options={{ title: 'Cars' }} />
        <Tab.Screen name="Location" component={LocationScreen} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Bookings" component={Bookings} />
      </Tab.Navigator>
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
        options={{headerShown:true}
        }
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
});

