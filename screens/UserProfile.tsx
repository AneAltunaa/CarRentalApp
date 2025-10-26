// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getUser, User } from '../data/user';
// import { useNavigation } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const UserProfile = () => {
//   const navigation = useNavigation();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const getUserInfo = async () => {
//     const storedUser = await AsyncStorage.getItem('userData');
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
//       <View style={styles.loadingContainer}>
//         <Text style={styles.loadingText}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Ionicons name="arrow-back" size={28} color="black" />
//       </TouchableOpacity>

//       {/* Profile card */}
//       <View style={styles.card}>
//         <Text style={styles.header}>User Profile</Text>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Email:</Text>
//           <Text style={styles.value}>{user?.email}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Name:</Text>
//           <Text style={styles.value}>{user?.name}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Surname:</Text>
//           <Text style={styles.value}>{user?.surname}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>Date of Birth:</Text>
//           <Text style={styles.value}>{user?.dateOfBirth}</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>CPR:</Text>
//           <Text style={styles.value}>{user?.cpr}</Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//     backgroundColor: '#f4f4f4',
//     minHeight: '100%',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontSize: 18,
//     color: '#666',
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     padding: 8,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 6,
//     elevation: 8,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: 'blue',
//     textAlign: 'center',
//   },
//   infoRow: {
//     flexDirection: 'row',
//     marginBottom: 12,
//   },
//   label: {
//     fontWeight: 'bold',
//     flex: 1,
//     color: '#333',
//   },
//   value: {
//     flex: 2,
//     color: '#555',
//   },
// });

// export default UserProfile;


import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUser, User } from '../data/user';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');

  const getUserInfo = async () => {
    const storedUser = await AsyncStorage.getItem('userData');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser?.email) {
      const userInfo = await getUser(parsedUser.email);
      setUser(userInfo);
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setEmail(userInfo.email);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleSave = async () => {
    if (!name || !surname || !email) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('userData');
      const userData = storedUser ? JSON.parse(storedUser) : null;

      const response = await fetch('http://10.0.2.2:5000/user/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: userData.id,
          name,
          surname,
          email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        Alert.alert('Success', 'Profile updated successfully!');
        const updatedUser = { ...userData, name, surname, email };
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not connect to the server.');
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.header}>User Profile</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Name:</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Surname:</Text>
          <TextInput style={styles.input} value={surname} onChangeText={setSurname} />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:  { 
    padding: 20, 
    alignItems: 'center', 
    backgroundColor: '#f4f4f4', 
    minHeight: '100%' 
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  loadingText: { 
    fontSize: 18, 
    color: '#666' 
  },
  backButton: { 
    alignSelf: 'flex-start', 
    padding: 8, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  card: { 
    width: '100%', 
    backgroundColor: '#fff', 
    borderRadius: 16, 
    padding: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 8 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: 'blue', 
    textAlign: 'center' 
  },
  infoRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  label: { 
    fontWeight: 'bold', 
    flex: 1, 
    color: '#333'
 },
  input: { 
    flex: 2, 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8, 
    padding: 8, 
    color: '#000' 
  },
  saveButton: { 
    marginTop: 20, 
    backgroundColor: 'blue', 
    borderRadius: 10, 
    paddingVertical: 12, 
    width: '100%' 
  },
  saveText: { 
    color: 'white', 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});

export default UserProfile;
