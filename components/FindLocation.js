import React, { useEffect, useState } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { TextInput, Button, View, StyleSheet, Dimensions, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function FindLocation() {
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('');
    const [cords, setCords] = useState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0221
    });

    useEffect(() => {
      (async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted') {
          Alert.alert('No permission to get location')
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);

    const fetchData = () => {
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=kxKEVG5doZHhnJYTIdj5PkObNk7ePXFi&location=' + address)
        .then(response => response.json())
        .then(data => {
          setCords({
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng
          })
      })
        .catch((error) => {
          Alert.alert('Error', error.message);
        });
      }
//latitude: 60.201373, longitude: 24.934041
return (
    <View style={styles.container}>
    <MapView
      style={styles.map}
      region = {{
        latitude: cords.latitude,
        longitude: cords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      }}>
        <Marker coordinate={{
          latitude: cords.latitude,
          longitude: cords.longitude
        }} />
    </MapView>
    <TextInput placeholder = 'Address'
      style ={{fontSize: 18, width: 200, backgroundColor: '#fff'}}
      onChangeText={text => setAddress(text)} />
      <Button title='Show' onPress={fetchData}></Button>
      <Text style={styles.boldText}>
            {locationStatus}
          </Text>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
        flex: 5,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    }
  });