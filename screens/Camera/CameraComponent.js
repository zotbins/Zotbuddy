import React, { useState, useEffect, useRef } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import axios from 'axios'
import { Camera } from 'expo-camera'
import * as Device from 'expo-device'
import * as ImageManipulator from 'expo-image-manipulator'

//todo: move to config and export
const IS_ANDROID = Platform.OS === 'android'
const IS_IOS = Platform.OS === 'ios'

//https://docs.expo.dev/versions/latest/sdk/camera/
const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back)

  const camera = useRef(null)

  const cropToSquare = async (photo) => {
    const res = await ImageManipulator.manipulateAsync(
      photo.uri,
      [
        {
          crop: {
            originX: 0,
            originY: (photo.height - photo.width) / 2,
            width: photo.width,
            height: photo.width,
          },
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    )
    //send to server here
    console.log(res)
  }

  const onPictureSaved = (photo) => {
    console.log(photo)
    if (IS_ANDROID) {
      //send to api
      cropToSquare(photo)
    } else if (IS_IOS) {
      //handle ios stuff
      cropToSquare(photo)
    }
  }

  const takePicture = () => {
    if (camera.current) {
      camera.current.takePictureAsync({ onPictureSaved: onPictureSaved })
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Camera
        ratio={'1:1'}
        type={type}
        style={{ width: 250, height: 250 }}
        ref={camera}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          height: '10%',
        }}
        onPress={takePicture}
      >
        <Text>snap</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CameraComponent
