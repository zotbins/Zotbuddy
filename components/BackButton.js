import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Platform
} from 'react-native'
import {
    Text,
    Card,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../assets/svgs/BackArrow.svg'

const BackButton = (props) => {

    const navigate = props.nav

    return  <>{
    <TouchableHighlight style={styles.back} onPress={navigate}><BackArrow style={styles.button}/></TouchableHighlight>

    }</>

}

const styles = StyleSheet.create({
    back: {
        position: "absolute",
        // top: 20,
        // left: 20,
        zIndex: 5,
        width: 70,
        height: 27,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
    button: {
      resizeMode: 'contain',
    }

})

export default BackButton; 