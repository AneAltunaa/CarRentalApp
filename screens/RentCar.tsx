import { RouteProp, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import CarDetails from '../components/CarDetails';
import { Calendar , CalendarProps } from 'react-native-calendars';
import RentCalendar from '../components/RentCalendar';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Modal, View, StyleSheet, ScrollView, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";

// for map part
import MapComponent from '../components/MapComponent';


const RentCar = () => {
  const route = useRoute<any>();
  const { car } = route.params;
  const navigation = useNavigation();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const handleConfirmRental = async () => {
  if (!startDate || !endDate) {
    alert("Please select both start and end dates for the rental.");
    return;
  }
  const storedUser = await AsyncStorage.getItem('userData');
  const user= storedUser ? JSON.parse(storedUser) : null;

  try {
    const response = await fetch("http://10.0.2.2:5000/rent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startDate,
        endDate,
        userId: user.id,   //for now, change to current logged user TODO
        carId: car.id,
      }),
    });

    const result = await response.json();

    if (result.success) {
      setShowSuccessModal(true);
    } else {
      Alert.alert("Error", result.message);
    }
  } catch (err) {
    console.error(err);
    Alert.alert("Error", "Could not connect to the server.");
  }
};
    
  return (
    <ScrollView>
      <LinearGradient
                          colors={["#0011FF", "#A46FFF"]}
                          start={{ x: 1, y: 1 }}
                          end={{ x: 0, y: 0 }}
                          style = {styles.gradientBorder}
                        >
        <View style={styles.cardContainer}>
            <Text style={styles.title}>{car.name}</Text>
            <Image source={{ uri: car.image }} style={{ width: 300, height: 200 }} />

            <View style={styles.bottomRow}>
                <Text style={styles.price}>{car.price} € / day</Text>
                <TouchableOpacity
                    onPress={() => setShowDetails(!showDetails)}>
                    <Text style={styles.details}>
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </Text>
                    
                </TouchableOpacity>
                
            </View>
            {showDetails && <CarDetails car={car} />}

            {/* Add this empty View for spacing */}
            <View style={{ height: 40 }} /> 

            {/* Map section */}
            <View style={styles.mapContainer}>
              <MapComponent />
            </View>

            <RentCalendar
            onSelectDates={(start, end) => {
            setStartDate(start);
            setEndDate(end);
          }} />

            <TouchableHighlight 
                onPress={handleConfirmRental}>
                  <LinearGradient
                                      colors={["#0011FF", "#A46FFF"]}
                                      start={{ x: 1, y: 1 }}
                                      end={{ x: 0, y: 0 }}
                                      style={styles.rentButton}
                                    >
                <Text style={styles.rental}>
                    Confirm Rental
                </Text>
                </LinearGradient>
            </TouchableHighlight>
        </View>
        </LinearGradient>
        <Modal 
        visible={showSuccessModal}
        transparent={true}
        animationType="slide">
          <View style = {styles.modal}>
            <View style = {styles.content}>
              <View style ={{flexDirection: 'row',width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20
              }}>
                <TouchableOpacity
                  style ={styles.cross}
                  onPress={() => 
                  setShowSuccessModal(false)
                  }>
                    <Ionicons name="car" size={30} color="blue" />
                  <Text style = {styles.backButton}>x</Text>
                </TouchableOpacity>
                <Text style = {styles.header}>Rental Confirmed!</Text>
              </View>
              <Text style = {styles.text} >You have successfully rented the {car.name} from {startDate} to {endDate}.</Text>
              <TouchableOpacity
              style ={styles.modalButton}
              onPress={
                () => {
                  setShowSuccessModal(false);
                  // navegar al carrito, dos niveles
                  const tabNav = navigation.getParent()?.getParent();
                  if (tabNav) {
                    (tabNav as any).navigate('CarTabs', {
                      screen: 'Cart'
                    });
                  }
                }}>

                <Text style = {styles.rental}>Go to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
      width:'90%',
        padding: 2, // πάχος του “border”
        borderRadius: 22,
        alignItems: "center",
      justifyContent: "center",
      marginVertical: 10,
        marginHorizontal: 15,
  },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 20,
        color: 'blue',
        textDecorationLine: 'underline',
    },
    rentButton: {
        borderRadius: 15,
        width: 150,
        alignSelf: 'flex-end'
    },
    rental: {
        color: 'white',
        padding: 10,
        fontSize: 18,
        alignSelf: 'center',
    },

    // map section
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginTop: 20,
      marginBottom: 20,
    },
    mapContainer: {
      height: 200,
      width: '100%',
      borderRadius: 15,
      overflow: 'hidden',
      marginBottom: 20,
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)', // διάφανο μαύρο φόντο
      justifyContent: 'center',
      alignItems: 'center',
    },
    content: {
      width: '85%',
      backgroundColor: 'white',
      borderRadius: 20,
      paddingTop: 10,
      paddingRight: 20,
      paddingLeft: 20,
      paddingBottom: 20,
      alignItems: 'center'
    },
    modalButton: {
      marginTop: 40,
      backgroundColor: 'blue',
      borderRadius: 15,
      paddingHorizontal: 10,
      alignSelf: 'flex-end'
    },
    header: {
      position: 'absolute',
      left: '50%',
      transform: [{ translateX: '-50%' }],
      fontSize: 22,
      marginTop: 10,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
    },
    cross: {
      alignSelf: 'flex-start',
    },
    backButton: {
      color: 'red',
      alignSelf: 'flex-start',  
      fontSize: 30,
    }
});
export default RentCar;