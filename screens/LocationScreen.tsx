// screens/LocationScreen.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const LocationScreen = () => {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        mapType="hybrid"
        initialRegion={{
          latitude: 55.3685,
          longitude: 10.4275,
          latitudeDelta: 0.02,   
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={{ latitude: 55.362, longitude: 10.4275 }}
          title="Car Rental Location"
          description="Pick up your rental car here"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default LocationScreen;