import React, {  } from 'react'
import { 
  Animated,
  Dimensions,
  StyleSheet, 
  View,
  Pressable,
  ScrollView,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  Image,
} from 'react-native'
import * as Linking from 'expo-linking';
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
import {withNavigation} from 'react-navigation';
import * as Location from 'expo-location'
import {getDistance} from 'geolib'
import { ThemeColors } from 'react-navigation';
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import { TapGestureHandler } from 'react-native-gesture-handler';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
// import MapboxGL from "@react-native-mapbox-gl/maps";

// MapboxGL.setAccessToken("pk.eyJ1Ijoiem90Ymluc3Rlc3QiLCJhIjoiY2tud3B0OTYxMGV2YTJzbzhxbGF1NHN2MyJ9.3xw5Mq1Rlk-5ioy4HHhtvg");

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

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      south: null,
      west: null,
      north: null,
      east: null,
      latitude: 33.647250,
      longitude: -117.838600,
      closestBin: "Default",
      distance: "N/A Mile(s) Away",
      cannotFindLocation: true,
      uniqueValue: 1,
      showInstructions: false,
      modalVisible: false,
      binSelected: null
    };
  }
  

  arr_of_Zotbins = {"zotbin1": {
                  "name": "West Food Court",  
                  "description": "We have three Zotbins\ndeployed here!\n", 
                  "percentage": 58,
                  "latitude": 33.648889, 
                  "longitude": -117.842500,
                  "image": require("../../assets/images/west-food-court.jpg")
                },
                "zotbin2": {
                  "name": "Donald Bren Hall",  
                  "description": "We have two Zotbins\ndeployed here!\n", 
                  "percentage": 88,
                  "latitude": 33.643056, 
                  "longitude": -117.841667,
                  "image": require("../../assets/images/dbh.jpg")
                }
    }

  arr_of_bins = [this.arr_of_Zotbins.zotbin1, this.arr_of_Zotbins.zotbin2]

  updateState(location) {
    // Uncomment this to navigate to current location
    // ----------------------------------------------
    this.setState({
      ...this.state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      cannotFindLocation: false
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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        status = await Location.requestForegroundPermissionsAsync();
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

  onMarkerPress = (num) => {
    const latitude = Object.values(this.arr_of_Zotbins)[num].latitude;
    const longitude = Object.values(this.arr_of_Zotbins)[num].longitude;
    if (num != this.state.binSelected && this.state.modalVisible)
    {
      this.setState({
        ...this.state,
        binSelected: num,
        latitude: latitude,
        longitude: longitude
      });
    }
    else 
    {
      this.setState({
        ...this.state,
        modalVisible: !this.state.modalVisible,
        binSelected: num,
        latitude: latitude,
        longitude: longitude
      });
    }
    // console.log(this.state.modalVisible, this.state.binSelected)
  }

  render() {
    const zotMarkers = Object.values(this.arr_of_Zotbins).map((zotbin, key) =>
      <Marker key={key}  image={require("../../assets/images/Zotbins_logo_transparent.png")} coordinate={{ latitude: zotbin.latitude, longitude: zotbin.longitude}}
      onPress={() => this.onMarkerPress(key)}
      >
      </Marker>
    );

      return (
        <View style={styles.mapView}>
          <MapView 
            region={{latitude: this.state.latitude, longitude: this.state.longitude, latitudeDelta: 0.02, longitudeDelta: 0.02}} 
            showsUserLocation={true}
            style={StyleSheet.absoluteFillObject} 
            provider={MapView.PROVIDER_GOOGLE}
          > 
            {zotMarkers}  
             
            {/* <ZotbinMarker title="West Food Court" description="Location of a Zotbin!" latitude={33.645191} longitude={-117.835342}/> */}
            {/* <Marker style={styles.binMarker} image={require("../../assets/images/Zotbins_logo_transparent.png")} coordinate={{ latitude: 33.647250, longitude: -117.846600 }} /> */}
    
          </MapView> 
          {
            <TouchableHighlight 
              style = {{marginLeft: responsiveWidth(7), marginTop: responsiveHeight(4), 
                        width: responsiveWidth(6)}}
              underlayColor = 'transparent'
              onPress={() => this.props.navigation.goBack()}
            > 
              <Image
                  source={require('../../assets/images/back_arrow.png')}
              />
            </TouchableHighlight>
          }
          {this.state.modalVisible &&        
            <View style={styles.modalView}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{color:'#39FF14', fontWeight: 'bold'}}>{Object.values(this.arr_of_Zotbins)[this.state.binSelected].name}</Text>
                    {/* <Text>{Object.values(this.arr_of_Zotbins)[this.state.binSelected].description}</Text> */}
                    <Text>Bin Capacity: {Object.values(this.arr_of_Zotbins)[this.state.binSelected].percentage}%{'\n'}</Text>
                    <Text 
                      style={{textDecorationLine:'underline', color:'blue', fontWeight:'bold'}}
                      onPress={() => Linking.openURL(`https://maps.google.com?q=${Object.values(this.arr_of_Zotbins)[this.state.binSelected].latitude},
                      ${Object.values(this.arr_of_Zotbins)[this.state.binSelected].longitude}`)}
                    >
                      Directions
                    </Text>
                  </View>
                  <Image style={{resizeMode:'cover', height: 100, width: responsiveWidth(38), marginLeft: 25}} 
                    source={Object.values(this.arr_of_Zotbins)[this.state.binSelected].image}
                  />
                </View>
            </View>
          }

          {this.state.cannotFindLocation ?
          <View style={styles.overlay}>
            {!this.state.showInstructions ?
            <View>
            <Text>Your location cannot found.</Text>
            <TouchableOpacity onPress={() => this.setShowInstructions(true)}>
              <Text>Click here to see how to show your location!</Text>
            </TouchableOpacity>
            </View>
            :<View>
            {/* <Text>To enable your location, please click Settings > Location > Allow Location</Text>
            <Text>And to enable it within this App, please go to this App's info > Permissions > Location > Allow Location Permission</Text> */}
            <TouchableOpacity onPress={this.refreshComponent}>
              <Text>Click here after you have enabled your location</Text>
            </TouchableOpacity>
            </View>
            }
            </View>
          :null}
           {/* <View style={styles.overlay}><Text>Closest Zotbin: {this.state.closestBin}</Text>
           <Text>Distance: {this.state.distance}</Text></View> */}
        </View>
      )
  }

}
export default withNavigation(MapPage)

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
    height: '100%',
    width: '100%'
  }, 
  calloutText: {
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
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    top: responsiveHeight(69)
  },
  button: {
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: 'blue'
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
  },

});

