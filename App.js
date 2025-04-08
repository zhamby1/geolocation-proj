import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import styles from './styles';


const API_KEY = "AIzaSyC6AElKyZr_cd9i65HIDALMOYnUicFe7eQ";
const URL = `https://maps.google.com/maps/api/geocode/json?key=${API_KEY}&latlng=`;




export default function App() {
//create a couple of stateful variables
//take a set of long and lat and grab the address from the googlemaps api
const [address, setAddress] = useState("loading...");
const [longitude, setLongitude] = useState();
const [latitude, setLatitude] = useState();


//useEffect to get the location
useEffect(() => {

  function setPosition({coords: {latitude, longitude}}) {
    setLongitude(longitude);
    setLatitude(latitude);

    //fetch the data from the google maps api
    fetch(`${URL}${latitude},${longitude}`)
      .then((resp) => resp.json())
      .then(({results}) =>{
        if (results.length > 0) {
          setAddress(results[0].formatted_address);
        } 
      })
      .catch((error) => console.log(error.message));
      
      
  }

  //create a watcher to watch for our current location
  let watcher
  //create an async function without a name just to get the location
  (async () =>{
    let {status} = await Location.requestForegroundPermissionsAsync
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    //part of the location exp api to get the current position
    let location = await Location.getCurrentPositionAsync({})
    setPosition(location);

    //watch the location
    watcher = await Location.watchPositionAsync(
      {accuracy: Location.LocationAccuracy.Highest},
      setPosition
    )


  })() //the () allows us to run the async function 
  
  //finally as the app is ran or we close the app we want to stop the watcher
  return () =>{
    watcher?.remove()
  }
}, [])

//we want to grab the address, long and lat from the stateful variables and show them

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Address: {address}</Text>
      <Text style={styles.label}>Latitude: {latitude}</Text>
      <Text style={styles.label}>Longitude: {longitude}</Text>
      
    </View>

  );
}


