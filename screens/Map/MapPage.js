import React, { useState } from 'react'
import { 
  Dimensions,
  StyleSheet, 
  View,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
  Modal
} from 'react-native'
import { Path, Svg } from 'react-native-svg'
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title, 
  Text,
  Button,
  Card,
  CardItem,
 
} from 'native-base'    

import MapView, { Marker } from "react-native-maps";

import zotbins from "../../assets/images/Zotbins_logo_transparent.png"

import * as Location from 'expo-location'
import {getDistance} from 'geolib'
import { ThemeColors } from 'react-navigation';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { TapGestureHandler } from 'react-native-gesture-handler';

// import MapboxGL from "@react-native-mapbox-gl/maps";

// MapboxGL.setAccessToken("pk.eyJ1Ijoiem90Ymluc3Rlc3QiLCJhIjoiY2tud3B0OTYxMGV2YTJzbzhxbGF1NHN2MyJ9.3xw5Mq1Rlk-5ioy4HHhtvg");

const styles = StyleSheet.create({
  mapView: {
    flexShrink: 1,
    height: '100%'
  }, calloutText: {
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#B6DFA7',
  },
  overlay: {
    backgroundColor: 'white'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

const ZotbinMarker = (props) => {

  return (
    
    <Marker key={props.title} style={styles.binMarker} image={require("../../assets/images/Zotbins_logo_transparent.png")} coordinate={{ latitude: props.latitude, longitude: props.longitude}}>
    <MapView.Callout tooltip style={styles.customView}>
      <View style={styles.calloutText}>
        <Text>{props.title} {"\n"}{props.description}{"\n"}{props.percentage}%<Button onPress={() => Alert.alert('The Directions')} title="Get Directions" color="#841584"/></Text>
        
      </View>
    </MapView.Callout>  
  </Marker>
    
  )
}

export default class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      south: null,
      west: null,
      north: null,
      east: null,
      latitude: null,
      longitude: null,
      closestBin: "Default",
      distance: "N/A Mile(s) Away",
      uniqueValue: 1,
      showInstructions: false,
    };
  }
  

  arr_of_Zotbins = {"zotbin1": {
                  "name": "West Food Court",  
                  "description": "Location of a Zotbin!", 
                  "percentage": 58,
                  "latitude": 33.645191, 
                  "longitude": -117.835342,
                },
                "zotbin2": {
                  "name": "Student Center",  
                  "description": "Location of a Zotbin!", 
                  "percentage": 88,
                  "latitude": 33.647250, 
                  "longitude": -117.846600,}}

  arr_of_bins = [this.arr_of_Zotbins.zotbin1, this.arr_of_Zotbins.zotbin2]

  updateState(location) {
    // Uncomment this to navigate to current location
    // ----------------------------------------------
    this.setState({
      ...this.state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    // Location used to show the Zotbins on the map
    // this.setState({
    //   ...this.state,
    //   latitude: 33.647250,
    //   longitude: -117.838600,
    // });
    // this.closestZotbin();
  }

  // setData(zotbinList) {
    

  // }

  // getBins() {
  //   fetch('testsite').then((response) => response.json()).then((json) => this.setData(json)).catch((error) => console.error(error));
  // }

  async getLocation() {
    try {
      // this.getBins();
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        status = await Location.requestPermissionsAsync();
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      this.updateState(location);
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    this.getLocation()
  }

  onRegionChangeComplete = (region) => {
    const center = point([region.longitude, region.latitude]);
    const verticalMeter = (111 * region.latitudeDelta) / 2;
    const horizontalMeter = (111 * region.longitudeDelta) / 2;
    const options = { units: 'kilometers' };
    const south = destination(center, verticalMeter, 180, options);
    const west = destination(center, horizontalMeter, -90, options);
    const north = destination(center, verticalMeter, 0, options);
    const east = destination(center, horizontalMeter, 90, options);
    this.setState({
      south: south.geometry.coordinates[1],
      west: west.geometry.coordinates[0],
      north: north.geometry.coordinates[1],
      east: east.geometry.coordinates[0],
    });
  };

  refreshComponent = () => {
    this.setState({
      uniqueValue: this.state.uniqueValue + 1
    })
    this.getLocation();
  }

  closestZotbin() {
    const {elements, south, west, north, east, latitude, longitude} = this.state
    let shortest_distance = 1000000000000
    let shortest_distance_index = 0

    for (let i = 0; i < this.arr_of_bins.length; i++) {
      let zotbin = this.arr_of_bins[i]
      let distance = getDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: zotbin.latitude, longitude: zotbin.longitude }
    );
      console.log(distance * 0.000621371192)
      if (distance < shortest_distance) {
        shortest_distance = distance
        shortest_distance_index = i
      } 
    }
    
    this.setState({
      ...this.state,
      closestBin: this.arr_of_bins[shortest_distance_index].name,
      distance: (Math.round(shortest_distance * 0.000621371192 * 10) / 10) + " Mile(s) Away"
    });
    console.log(this.arr_of_bins[shortest_distance_index].name)
  }


  setShowInstructions(bool) {
    console.log('hi')
    this.setState({
      ...this.state,
      showInstructions: bool
    });
  }

  render() {
  
    const zotMarkers = Object.values(this.arr_of_Zotbins).map((zotbin, key) =>
        <Marker key={key} style={styles.binMarker} image={require("../../assets/images/Zotbins_logo_transparent.png")} coordinate={{ latitude: zotbin.latitude, longitude: zotbin.longitude}}>
        <MapView.Callout tooltip style={styles.customView}>
          <View style={styles.calloutText}>
            <Text>{zotbin.name} {"\n"}{zotbin.description}{"\n"}{zotbin.percentage}%<Button onPress={() => Alert.alert('The Directions')} title="Get Directions" color="#841584"/></Text>
            
          </View>
        </MapView.Callout>  
      </Marker>
      
    );
      return (
        <View style={styles.mapView}>
          
          <MapView 
            region={{latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}} 
            showsUserLocation={true}
            style={StyleSheet.absoluteFillObject} 
            provider={MapView.PROVIDER_GOOGLE}> 
            {zotMarkers}       
            {/* <ZotbinMarker title="West Food Court" description="Location of a Zotbin!" latitude={33.645191} longitude={-117.835342}/>
            <Marker style={styles.binMarker} image={require("../../assets/images/Zotbins_logo_transparent.png")} coordinate={{ latitude: 33.647250, longitude: -117.846600 }} /> */}

          </MapView> 
          {this.state.latitude == null ?
          <View style={styles.overlay}>
            {!this.state.showInstructions ?
            <View>
            <Text>Your location cannot found.</Text>
            <TouchableOpacity onPress={() => this.setShowInstructions(true)}>
              <Text>Click here to see how to show your location!</Text>
            </TouchableOpacity>
            </View>
            :<View><Text>To enable your location, please click Settings > Location > Allow Location</Text>
            <Text>And to enable it within this App, please go to this App's info > Permissions > Location > Allow Location Permission</Text>
            <TouchableOpacity onPress={this.refreshComponent}>
              <Text>Click here after you have enabled your location</Text>
            </TouchableOpacity>
            </View>
            }
            </View>
          :<View style={styles.overlay}><Text>Closest Zotbin: {this.state.closestBin}</Text>
          <Text>Distance: {this.state.distance}</Text></View>}
        </View>
      )
  }

}
