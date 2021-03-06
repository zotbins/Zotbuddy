import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import * as Font from 'expo-font'
import { Ionicons } from '@expo/vector-icons'
import firebase from 'firebase'
import { Asset } from 'expo-asset'
import AppLoading from 'expo-app-loading'
import AppNavigator from './navigation/AppNavigator'
import LoginPage from './screens/Login/LoginPage'

import { firebaseConfig } from './config'

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

const App = props => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  const loadResourcesAsync = async () => {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ])
  }
  
  const handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error)
  }
  
  const handleFinishLoading = (setLoadingComplete) => {
    setLoadingComplete(true)
  }

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <>
        <StatusBar hidden />
        <AppNavigator/>
      </>
    )
  }
}

export default App 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
