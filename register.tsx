import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Alert, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';

export default function RegisterScreen() {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [dateOfBirth, setDateBirth] = useState('');
  const [cpr, setCpr] = useState('');

  const register = async () =>{
    try {
    //Fetch from backend
        const response = await fetch('http://10.0.2.2:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password, name, surname, dateOfBirth, cpr }),
        }); 
        const data = await response.json();
        if (data.success) {
          Alert.alert('Success', 'User registered successfully');
          navigation.navigate('login');
        } else {
          Alert.alert('Error', 'Registration failed');
        }
      } catch (err: any) {
        Alert.alert('Error', err.message);
      }
  }

  return(
    <View style={styles.container}>
            <Text style={{fontFamily: 'Courier', fontSize: 24,}}>Create account</Text>
          <View style={styles.backgroundInput}>
              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Username:</Text><TextInput placeholder='Enter your username' style={styles.textStyle} value={username} onChangeText={setUsername}/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Password:</Text><TextInput placeholder='Enter your password' style={styles.textStyle} value={password} onChangeText={setPassword} secureTextEntry/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Name:</Text><TextInput placeholder='Enter your name' style={styles.textStyle} value={name} onChangeText={setName}/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Surname:</Text><TextInput placeholder='Enter your surname' style={styles.textStyle}  value={surname} onChangeText={setSurname}/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Date of Birth:</Text><TextInput placeholder='Enter your date of birth (dd/mm/yyyy)' style={styles.textStyle}  value={dateOfBirth} onChangeText={setDateBirth}/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>CPR:</Text><TextInput placeholder='Enter your CPR number' style={styles.textStyle}  value={cpr} onChangeText={setCpr}/>
              </View>


          </View>

          <Text></Text>

          <Button title='Register' onPress={register}/>
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