import React, {useState, useEffect} from 'react';
import { TouchableOpacity,Text,View, ScrollView, StyleSheet, Dimensions, Alert, Button } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location'
import LocationPicker from '../components/LocationPicker'
import Card from '../components/Card'

const SearchScreen = props => {
  const [region, setRegion] = useState(
    {
      // region: 
      //   {
          latitude:0, 
          longitude: 0, 
          latitudeDelta: 1, 
          longitudeDelta:1
        // }
      }
    )
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [selectedStore, setSelectedStore] = useState(0)
  const [storeProducts, setStoreProducts] = useState([])
  const [cart, setCart] = useState([])
  // useEffect( () => {
  //   if(loading == false && selectedStore ){
  //     setLoading(true)
  //   }
  // })
  
  

  function getStoresFromApiAsync() {
    if (loading){
      return
    }
    let lat = region.latitude
    let lng = region.longitude
    let latDelta = region.latitudeDelta
    let lngDelta = region.longitudeDelta
    let url = `https://dfscstore.azurewebsites.net/getstores?lat=${lat}&lng=${lng}&latdiff=1&longdiff=1`
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => { setStores(responseJson)
        console.log('got stores')
        
        // return responseJson.stores;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  if (stores.length === 0){
    getStoresFromApiAsync()
  }
  
  var map = <MapView style={styles.mapStyle} />
  console.log(loading, stores)
  if (!loading){ 
    console.log('rerendering map definition')
    map = (
    <MapView 
      initialRegion={region} 
      style={styles.mapStyle} 
      onRegionChangeComplete={(newRegion) => {
        console.log('regionChangeCompleted')
      }
      }
    >
      {stores.map(store => (
        <Marker
        key={store.store_id}
        coordinate={{latitude:store.lat, longitude: store.lng}}
        title={store.fuel_company}
        description={store.name}
      />))}
      
    </MapView>
    )
  }
  const setSelectedStoreValue = id => setSelectedStore(id)
  if (loading){
  navigator.geolocation.getCurrentPosition(
    position => {
      // if (loading){ 
      //   console.log('still loading.')
      //   return 
      // }
      const location = JSON.stringify(position);
      setRegion({
        latitude: position.coords.latitude, 
        longitude: position.coords.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      })
      setLoading(false)
      console.log('got current postion')
    },
    error => Alert.alert(error.message),
    {enableHighAccuracy: true, timeout: 20000, maximumAge:10000})
  }


  var returnValue = (<ScrollView style={styles.container}>   
  {map}
    {stores.map(store => (
      <TouchableOpacity onPress={() => {
        props.navigation.navigate({routeName: 'Store', params: {store: store, cart: []}})
      }}>
    <Card 
    key={store.store_id} 
    imageUri='https://tinyurl.com/buceepic' 
    title={store.fuel_company +': ' + store.name}
    description={store.address}
    />
    </TouchableOpacity>
    ))}
    
  </ScrollView>)
  
  return (returnValue);
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



export default SearchScreen