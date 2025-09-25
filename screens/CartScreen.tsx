// screens/CartScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartScreen = () => {
  return (
    // A container view to center the content
    <View style={styles.container}>
      <Text>Cart Screen</Text>
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

export default CartScreen;