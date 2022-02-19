import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Platform
} from 'react-native'
import {
    Text,
    Card,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../assets/svgs/BackArrow.svg'

const BackButton = (props) => {

    const navigation = useNavigation()

    return  <>{Platform.OS == 'ios' ?
    <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}><BackArrow style={styles.button}/></TouchableOpacity>
    
    :
    <></>
    
    }</>

}

const styles = StyleSheet.create({
    back: {
        position: "absolute",
        top: 20,
        left: 20,
        zIndex: 5,
        width: 70,
        height: 27,
        backgroundColor: '#DCDCDC',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black'
      },
    button: {
      resizeMode: 'contain',
    }
    
})

export default BackButton;