import { StyleSheet, Text, TextInput, Alert, View, Button } from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';


export default function Home(){

    const navigation = useNavigation();

const loginButton = async () => {
    navigation.navigate('login')
    }

const registerButton = async () => {
    navigation.navigate('register')
    }

  return(
    <View style={styles.container}>
    <Text style={styles.welcomeText}>Welcome!</Text>
    <View style={styles.buttonStyle}>
        <View style={styles.button}>
        <Button title='Log in' style={styles.buttonStyle} onPress={loginButton}/>
</View>
<View style={styles.button}>
        <Button title='register' style={styles.buttonStyle} onPress={registerButton}/>
        </View>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle:{
      borderColor: 'black',
      borderWidth: 0.5,
      },
  labels:{
      flexDirection:'row'},
   backgroundInput:{
       borderColor:'black',
       borderWidth:1,
       padding: 40,
       borderRadius: 5,
       },
   buttonStyle: {
        flexDirection: 'row',
       },
   button:{
       marginRight:20},

   welcomeText:{
       fontSize: 46,
       fontWeight: 'bold',
       marginBottom: 50,

       },

});