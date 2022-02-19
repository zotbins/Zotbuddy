import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Icon } from 'native-base'
import { Feather } from '@expo/vector-icons';

import HomePage from '../screens/Home/HomePage'
import AboutPage from '../screens/About/AboutPage'
import ScannerPage from '../screens/Scanner/ScannerPage'
import ProfilePage from '../screens/Profile/ProfilePage'
import TriviaPage from '../screens/Trivia/TriviaPage'
import EventsPage from '../screens/Events/EventsPage'
import SocialFeedPage from '../screens/SocialFeed/SocialFeedPage'
import MapPage from '../screens/Map/MapPage'
import QuizPage from '../screens/Trivia/QuizPage'

import NavCamera from '../assets/svgs/NavCamera.svg'
import NavEvent from '../assets/svgs/NavEvent.svg'
import NavHome from '../assets/svgs/NavHome.svg'
import CameraOptionPage from '../screens/CameraOption/CameraOptionPage';

const Tab = createBottomTabNavigator()

const MainStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName
          switch (route.name) {
            case 'Home':
              return <NavHome />
            case 'CameraOption':
              return <NavCamera />
            case 'Events':
              return <NavEvent />
            default:
              break
          }
          return <Feather name={iconName}  size={24} style={{ color }} />
          // return <Ionicons name='home' size={24} style={{ color }} />
        },
      })}
      tabBarOptions={{
        activeTintColor: '#0064A4',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="CameraOption" component={CameraOptionPage} />
      <Tab.Screen name="Events" component={EventsPage} />
    </Tab.Navigator>
  )
}

export default MainStack
