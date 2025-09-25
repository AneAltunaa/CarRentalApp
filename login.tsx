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
  /**try {
      const result = await login(username, password);
      if (result.success) {
        Alert.alert('Success', result.message);
      }
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }**/
   /*If login correct navigate to mainPage */
   
    navigation.navigate('MainTabs')

}

  return(
    <View style={styles.container}>

        <Text style={{fontFamily: 'Courier', fontSize:24}}>Login page</Text>
      <View style={styles.backgroundInput}>
          <View style={styles.labels}>
          <Text style={{marginRight: 10, marginTop: 10}}>Username:</Text><TextInput placeholder='Enter your Username' style={styles.textStyle}/>
          </View>

          <View style={styles.labels}>
          <Text style={{marginRight: 10, marginTop: 10}}>Password:</Text><TextInput placeholder='Enter you Password' style={styles.textStyle} secureTextEntry/>
          </View>
      </View>

      <Text></Text>


      <Button title='Log in'  onPress={() =>loginFunction()}/>

      <Button title='Forgot the password' onPress={() =>{navigation.navigate('forgotPass') }} />
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