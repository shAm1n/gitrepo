import React from 'react';
import { StyleSheet, View } from 'react-native';
//import Apirepo from './components/Apirepo';
//import Recipesearch from './components/Recipesearch';
//import Exchange from './components/Exchange';
import Map from './components/Map';

export default function App() {
  return (
    <View style={styles.container}>
      <Map />
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
});
