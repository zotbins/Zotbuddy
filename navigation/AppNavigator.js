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
import QuizPage from '../screens/Trivia/QuizPage'
import SocialFeedPage from '../screens/SocialFeed/SocialFeedPage'
import QuizForm from '../screens/Trivia/QuizForm'
import ScannerPage from '../screens/Scanner/ScannerPage'
import CameraOptionPage from '../screens/CameraOption/CameraOptionPage'

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
            <Stack.Screen name='Quiz' component={QuizPage} />
            <Stack.Screen name='SocialMedia' component={SocialFeedPage} />
            <Stack.Screen name='CameraOption' component={CameraOptionPage} />
            <Stack.Screen name='Scanner' component={ScannerPage} />

            
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default AppNavigator