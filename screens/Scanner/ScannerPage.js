import React, { useState } from 'react'
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

import BarCodeScannerComponent from '../../components/BarCodeScanner'
import CameraPage from '../Camera/CameraPage'

const ScannerPage = (props) => {
  console.log('scanner')
  // return (<BarCodeScannerComponent/>)
  return <CameraPage />
}

export default ScannerPage
