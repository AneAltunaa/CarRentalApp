import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CustomHeader = ({ title, navigation }: { title: string; navigation: any }) => ({
  title: title,
  headerTitleAlign: 'center' as const,
  headerTitleStyle: { fontSize: 22, fontWeight: 'bold' as const },
  headerLeft: () => (
    <TouchableOpacity
      style={{
        marginLeft: 10,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: 'black',
        borderRadius: 8,
      }}
      onPress={async () => {
        await AsyncStorage.removeItem('user');
        navigation.reset({
          index: 0,
          routes: [{ name: 'login' }],
        });
      }}
    >
      <Text style={{ color: 'blue', fontWeight: 'bold' }}>Logout</Text>
    </TouchableOpacity>
  ),
  headerRight: () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('UserProfile')}>
        <Ionicons
          name="person-circle-outline"
          size={32}
          color="black"
          style={{ marginRight: 10 }}
        />
    </TouchableOpacity>
  ),
});