import { RouteProp, useRoute } from '@react-navigation/native';


import { View, StyleSheet, Text, Image } from 'react-native';

type RentCarRouteProp = RouteProp<RootStackParamList, 'RentCar'>;

const RentCar = () => {
  const route = useRoute<RentCarRouteProp>();
  const { car } = route.params;

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.title}>{car.name}</Text>
      <Image source={{ uri: car.image }} style={{ width: 300, height: 200 }} />
      
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{car.price} € / day</Text>
        <Text style={styles.details}>Details</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    cardContainer: {
        borderColor: 'blue',
        borderWidth: 1.5,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 15,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Shadow for Android
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
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
    }
});
export default RentCar;