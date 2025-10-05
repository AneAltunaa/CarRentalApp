// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getUser, User } from '../data/user';
// import { useNavigation } from '@react-navigation/native';

// const UserProfile = () => {
//   const navigation = useNavigation();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const getUserInfo = async () => {
//     const storedUser = await AsyncStorage.getItem('user');
//     const parsedUser = storedUser ? JSON.parse(storedUser) : null;

//     if (parsedUser?.email) {
//       const userInfo = await getUser(parsedUser.email);
//       setUser(userInfo);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     getUserInfo();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Button title="Back" onPress={() => navigation.goBack()} />
//       <Text>Email: {user?.email}</Text>
//       <Text>Name: {user?.name}</Text>
//       <Text>Surname: {user?.surname}</Text>
//       <Text>Date of Birth: {user?.dateOfBirth}</Text>
//       <Text>CPR: {user?.cpr}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default UserProfile;
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, User } from '../data/user';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserInfo = async () => {
    const storedUser = await AsyncStorage.getItem('user');
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
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Profile card */}
      <View style={styles.card}>
        <Text style={styles.header}>User Profile</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Surname:</Text>
          <Text style={styles.value}>{user?.surname}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth:</Text>
          <Text style={styles.value}>{user?.dateOfBirth}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>CPR:</Text>
          <Text style={styles.value}>{user?.cpr}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    minHeight: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'blue',
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    flex: 1,
    color: '#333',
  },
  value: {
    flex: 2,
    color: '#555',
  },
});

export default UserProfile;
