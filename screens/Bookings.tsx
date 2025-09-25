// screens/Bookings.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Bookings = () => {
  return (
    // A container view to center the content
    <View style={styles.container}>
      <Text>Bookings Screen</Text>
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

export default Bookings;