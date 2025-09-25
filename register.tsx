import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import React, { useState } from 'react';

function register(username: string, password: string){ //what else??
  //add this to the db
  console.log(`Logging in with username: ${username} and password: ${password}`);
}

export default function RegisterScreen() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
              <Text style={{marginRight: 10, marginTop: 10}}>Name:</Text><TextInput placeholder='Enter your name' style={styles.textStyle}/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Surname:</Text><TextInput placeholder='Enter your surname' style={styles.textStyle}  secureTextEntry/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>Date of Birth:</Text><TextInput placeholder='Enter your date of birth (dd/mm/yyyy)' style={styles.textStyle}  secureTextEntry/>
              </View>

              <View style={styles.labels}>
              <Text style={{marginRight: 10, marginTop: 10}}>CPR:</Text><TextInput placeholder='Enter your CPR number' style={styles.textStyle}  secureTextEntry/>
              </View>


          </View>

          <Text></Text>

          <Button title='Register' onPress={() =>register(username, password)}/>
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