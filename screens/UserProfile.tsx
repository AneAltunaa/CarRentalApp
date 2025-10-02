import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, User } from '../data/user';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const storedUser = await AsyncStorage.getItem('userData');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser?.email) {
      const userInfo = await getUser(parsedUser.email);
      setUser(userInfo);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Back" onPress={() => navigation.goBack()} />
      <Text>Email: {user?.email}</Text>
      <Text>Name: {user?.name}</Text>
      <Text>Surname: {user?.surname}</Text>
      <Text>Date of Birth: {user?.dateOfBirth}</Text>
      <Text>CPR: {user?.cpr}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UserProfile;
