import React from 'react';
import { ScrollView, StyleSheet, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'

import LocationPicker from '../components/LocationPicker'

export default function SearchScreen() {
  console.log('in search');
  
  Location.requestPermissionsAsync();
  console.log('requested permissions')


  navigator.geolocation.getCurrentPosition(
    position => {
      const location = JSON.stringify(position);
      console.log(location);
    },
    error => Alert.alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge:1000})
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
       {/* <MapView style={styles.mapStyle} />
        */}
        <LocationPicker />
    </ScrollView>
  );
}

SearchScreen.navigationOptions = {
  title: 'Search for your C-Store',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * .4,
  }
});
