import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native/types_generated/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from '../data/user';


const UserProfile = () => {

  const getUserInfo = async() => {
      const storedUser = await AsyncStorage.getItem('user');
      const user= storedUser ? JSON.parse(storedUser) : null;

      const userInfo = getUser(user.email);
      return userInfo;
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    // A container view to center the content
    <View style={styles.container}>
      <Button title="Back"/>


      <Text>Email: {}</Text>
      <Text>Name: </Text>
      <Text>Surname: </Text>
      <Text>Date of Birth: </Text>
      <Text>CPR: </Text>
    </View>
  );
};

// Basic styles for the container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfile;