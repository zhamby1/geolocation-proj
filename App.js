import React from 'react';
import {View, StatusBar} from 'react-native';
//mapview takes your native map and renders it and allows you to use it
import MapView from 'react-native-maps';
import styles from './styles'


StatusBar.setBarStyle("dark-content");

export default function App() {

//we want to grab the address, long and lat from the stateful variables and show them

  return (
    //redner a mapview with some built in functionality
    <View style={styles.container}>
      <MapView style={styles.mapView} showUserLocation followUserLocation />
    </View>

  );
}


