import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner'
import axios from 'axios'
import { Camera } from 'expo-camera'

//https://docs.expo.dev/versions/latest/sdk/camera/
const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(false)
  const [type, setType] = useState(Camera.Constants.Type.back)

  const camera = useRef(null)

  const onPictureSaved = (photo) => {
    console.log(photo)
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
        type={type}
        style={{ width: '100%', height: '90%' }}
        ref={camera}
      />
      <TouchableOpacity
        style={{
          width: '100%',
          height: '10%',
        }}
        onPress={() => {}}
      >
        <Text>snap</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CameraComponent
