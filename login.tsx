import { StyleSheet, Text, TextInput, Alert, View, Button } from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native'; 



interface LoginScreenProps {
  username: string | null; 
  password: string | null;
  login: (username: string, password: string) => void;
}


export default function LoginScreen() {
  
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginFunction = async () =>{
  try {
  //Fetch from backend
      const response = await fetch('http://10.0.2.2:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        navigation.navigate('CarTabs');
      } else {
        Alert.alert('Error', 'Incorrect username or password');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
}

 return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
        }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 8,
        }}
      />
      <Button title="Log in" onPress={() => loginFunction()} />
      <Button title='Forgot the password' onPress={() =>{navigation.navigate('ForgotPass') }} />
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
      borderRadius: 10,
      marginBottom: 5
      },
  labels:{
      flexDirection:'row', },
   backgroundInput:{
       borderColor:'black',
       borderWidth:1,
       padding: 40,
       borderRadius: 20,
       },

});