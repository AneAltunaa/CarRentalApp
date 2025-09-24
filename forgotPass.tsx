import { StyleSheet, Text, TextInput, Alert, View, Button } from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';


export default function forgotPass() {

  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  return(
    <View style={styles.container}>
        <Text style={{fontFamily: 'Courier', fontSize:24}}>Password changing</Text>
      <View style={styles.backgroundInput}>
          <View style={styles.labels}>
          <Text style={{marginRight: 10, marginTop: 10}}>Username:</Text><TextInput placeholder='Enter your Username' style={styles.textStyle}/>
          </View>

          <View style={styles.labels}>
          <Text style={{marginRight: 10, marginTop: 10}}>New Password:</Text><TextInput placeholder='Enter you Password' style={styles.textStyle} secureTextEntry/>
          </View>
      </View>

      <Text></Text>


      <Button title='Change Password'/>

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