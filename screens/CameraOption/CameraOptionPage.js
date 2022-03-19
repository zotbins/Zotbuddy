import React, { useState } from 'react'
import { 
  Dimensions,
  StyleSheet,
  Image,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Rect, Svg } from 'react-native-svg'
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  H1,
  Button,
  Card,
  Tabs,
  Tab,
  CardItem,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'

const CameraOptionPage = props => {

  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.choiceBox}>
        <Text style={styles.title}>Select an option to identify your waste.</Text>
        <TouchableOpacity
            style={[styles.button, {marginBottom: 15}]}
            onPress={() => navigation.navigate('Scan')}
          >
            <Text style={[styles.buttonText]}>Bar Code Scanning</Text>
          </TouchableOpacity>
          {/* UNDER CONSTRUCTION */}
          {/* <TouchableOpacity
            style={[styles.button, {marginBottom: 25}]}
            // onPress={() => navigation.navigate('Map')}
          >
            <Text style={[styles.buttonText]}>Image Recognition</Text>
          </TouchableOpacity> */}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#6AA2B8',
  },

  button: {
    marginTop: 5,
    borderRadius: 20,
    width: 250,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0064A4'
  },

  choiceBox: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 5,
    elevation: 3,
    flexShrink: 3,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    paddingBottom: 20,
    width: '92%',
  },

  buttonText: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
})

export default CameraOptionPage; 