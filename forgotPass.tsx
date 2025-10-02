import { StyleSheet, Text, TextInput, Alert, View, Button } from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';


export default function ForgotPass() {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changePassword = async () =>{
    try {
    //Fetch from backend
        const response = await fetch('http://10.0.2.2:5000/updatePassword', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        }); 
        const data = await response.json();

        if (data.success) {
          Alert.alert('Success', 'Password changed successfully');
          navigation.navigate('login');
        } else {
          Alert.alert('Error', 'Incorrect username');
        }
      } catch (err: any) {
        Alert.alert('Error', err.message);
      }
  }

  return(
    <View style={styles.container}>
        <Text style={{fontFamily: 'Courier', fontSize:24}}>Password changing</Text>
      <View style={styles.backgroundInput}>
          <View style={styles.labels}>
          <Text style={{marginRight: 10, marginTop: 10}}>Username:</Text><TextInput placeholder='Enter your email' style={styles.textStyle} value={username} onChangeText={setUsername}/>
          </View>

          <View style={styles.labels}>
          <Text style={{marginRight: 10, marginTop: 10}}>New Password:</Text><TextInput placeholder='Enter you Password' style={styles.textStyle} value={password} onChangeText={setPassword} secureTextEntry/>
          </View>
      </View>

      <Text></Text>


      <Button title='Change Password' onPress={changePassword}/>

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