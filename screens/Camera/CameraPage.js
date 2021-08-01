import React, { Component } from 'react'
import { View, Dimensions, Text } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import axios from 'axios'

import CameraComponent from './CameraComponent'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const CameraPage = () => {
  return <CameraComponent />
}

export default CameraPage
