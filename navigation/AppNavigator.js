import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LoginPage from '../screens/Login/LoginPage'
import MainStack from './MainStack'

import SignUpPage from '../screens/SignUp/SignUpPage'
import ForgotPasswordPage from '../screens/ForgotPassword/ForgotPasswordPage'
import ResetPassword from '../screens/Reset/ResetPassword'
import LeaderboardPage from '../screens/Leaderboard/LeaderboardPage'
import MapPage from '../screens/Map/MapPage'
import TriviaPage from '../screens/Trivia/TriviaPage'
import ProfilePage from '../screens/Profile/ProfilePage'
import AboutPage from '../screens/About/AboutPage'


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
            <Stack.Screen name='ForgotPassword' component={ForgotPasswordPage} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='Leaderboard' component={LeaderboardPage} />
            <Stack.Screen name='Map' component={MapPage} />
            <Stack.Screen name='Trivia' component={TriviaPage} />
            <Stack.Screen name='Profile' component={ProfilePage} />
            <Stack.Screen name='AboutUs' component={AboutPage} />
            

            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default AppNavigator