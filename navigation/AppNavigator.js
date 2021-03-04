import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginPage from '../screens/Login/LoginPage'
import MainStack from './MainStack'

import SignUpPage from '../screens/SignUp/SignUpPage'


const Stack = createStackNavigator()

const AppNavigator = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Login'} headerMode={false}>
        {props.isAuth ? (
          <Stack.Screen name='Main' component={MainStack} />
        ) : (
          <>
            <Stack.Screen name='Main' component={MainStack} />
            <Stack.Screen name='Login' component={LoginPage} />
            <Stack.Screen name='SignUp' component={SignUpPage} />

            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default AppNavigator