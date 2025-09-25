import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import login from './login';
import register from './register';
import Home from './Home';
import mainPage from './mainPage';
import forgotPass from './forgotPass';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Database } from "./database";

const RootStack = createNativeStackNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {title: 'Welcome'},
    },
    login: {
      screen: login,
    },
    register:{
        screen: register},
    mainPage:{
        screen: mainPage},
    forgotPass:{
        screen: forgotPass}
  },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
  return (
    <Navigation/>
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
