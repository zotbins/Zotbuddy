import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image} from 'react-native'
// import {
//   Container,
//   Content,
//   Header,
//   Left,
//   Right,
//   Body,
//   Title,
//   Button,
//   Card,
//   CardItem,
// } from 'native-base'

import BarCodeScannerComponent from '../../components/BarCodeScanner'

const ScannerPage = (props) => {
  console.log('SCANNER')
  return(
    <BarCodeScannerComponent/>
  )

  
}

export default ScannerPage