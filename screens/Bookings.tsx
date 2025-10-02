// screens/Bookings.tsx

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  Alert, 
  Dimensions,
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface CompletedRental {
  rentalId: number;
  name: string;
  model: string;
  year: string;
  image: string;
  price: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'paid';
}

const Bookings = () => {
  const [bookings, setBookings] = useState<CompletedRental[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  // Refresh data every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchBookings();
    }, [])
  );

  const fetchBookings = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (!userDataString) {
        Alert.alert('Error', 'Please login first');
        return;
      }

      const userData = JSON.parse(userDataString);
      const response = await fetch(`http://10.0.2.2:5000/bookings/${userData.id}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      Alert.alert('Error', 'Failed to load bookings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateTotal = (item: CompletedRental) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const timeDiff = endDate.getTime() - startDate.getTime();
    let daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff <= 0) {
      daysDiff = 1;
    }
    
    let pricePerDay = 0;
    const priceMatch = item.price.match(/\$(\d+)(?:\/d[íi]a|\/day)?/i);
    if (priceMatch) {
      pricePerDay = parseInt(priceMatch[1]);
    }
    
    if (pricePerDay === 0) {
      const fallbackMatch = item.price.match(/\$?(\d+)/);
      if (fallbackMatch) {
        pricePerDay = parseInt(fallbackMatch[1]);
      }
    }
    
    if (pricePerDay === 0) {
      pricePerDay = 50;
    }
    
    const totalPrice = pricePerDay * daysDiff;
    
    return {
      days: daysDiff,
      pricePerDay: pricePerDay,
      total: totalPrice
    };
  };

  const renderBookingCard = ({ item }: { item: CompletedRental }) => (
    <View style={styles.cardContainer}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.model} • {item.year}</Text>
        <Text style={styles.statusBadge}>
          {item.status === 'completed' ? 'Completed' : 'Paid'}
        </Text>
      </View>

      {/* Image Section */}
      <View style={styles.imageSection}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        {/* Rental Period Section */}
        <View style={styles.rentalSection}>
          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>From</Text>
              <Text style={styles.dateText}>{formatDate(item.startDate)}</Text>
            </View>
            <View style={styles.dateSeparator}>
              <Text style={styles.arrowText}>→</Text>
            </View>
            <View style={styles.dateColumn}>
              <Text style={styles.dateLabel}>To</Text>
              <Text style={styles.dateText}>{formatDate(item.endDate)}</Text>
            </View>
          </View>
        </View>

        {/* Total Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLine}>
            Total Paid: €{calculateTotal(item).total}
          </Text>
          <Text style={styles.priceBreakdown}>
            €{calculateTotal(item).pricePerDay}/day × {calculateTotal(item).days} days
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading your bookings...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No bookings found</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item.rentalId.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flexGrow: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardContainer: {
    height: height * 0.45, 
    width: width * 0.9,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: 10, 
    marginHorizontal: 20,
    borderColor: 'blue',
    borderWidth: 1.5,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 3,
  },
  subtitle: {
    fontSize: 14, 
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  statusBadge: {
    backgroundColor: '#2196f3',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  imageSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  image: {
    width: width * 0.7, 
    height: height * 0.15,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  rentalSection: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 10,
  },
  dateColumn: {
    alignItems: 'center',
    flex: 1,
  },
  dateSeparator: {
    paddingHorizontal: 15,
  },
  arrowText: {
    fontSize: 20,
    color: '#2196f3',
    fontWeight: 'bold',
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 3,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  totalSection: {
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  totalLine: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 3,
  },
  priceBreakdown: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

export default Bookings;