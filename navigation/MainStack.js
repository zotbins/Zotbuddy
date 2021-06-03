import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'native-base'

import HomePage from '../screens/Home/HomePage'
import AboutPage from '../screens/About/AboutPage'
import ScannerPage from '../screens/Scanner/ScannerPage'
import ProfilePage from '../screens/Profile/ProfilePage'
import TriviaPage from '../screens/Trivia/TriviaPage'
import EventsPage from '../screens/Events/EventsPage'
import SocialFeedPage from '../screens/SocialFeed/SocialFeedPage'
import MapPage from '../screens/Map/MapPage'

const Tab = createBottomTabNavigator()

const MainStack = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName
            switch (route.name) {
              case 'Home':
                iconName = 'home'
                break
              case 'About':
                iconName = 'home'
                break
              case 'Trivia':
                iconName = 'albums-outline'
                break
              case 'Scanner':
                iconName= 'trash-bin-outline'
                break
              case 'Profile':
                iconName = 'person-outline'
                break
              case 'Events':
                iconName = 'calendar-clear-outline'
                break
              case 'SocialFeed':
                iconName = 'logo-instagram'
              case 'Map':
                iconName = 'map-pin'
              default:
                break
            }
            return <Icon name={iconName} style={{ color }} />
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name='Home' component={HomePage} />
        <Tab.Screen name='About' component={AboutPage} />
        <Tab.Screen name='Trivia' component={TriviaPage} />
        <Tab.Screen name='Scanner' component={ScannerPage} />
        <Tab.Screen name='Profile' component={ProfilePage} />
        <Tab.Screen name='Events' component={EventsPage} />
        <Tab.Screen name='SocialFeed' component={SocialFeedPage} />
        <Tab.Screen name='Map' component={MapPage} />
      </Tab.Navigator>
  )
}

export default MainStack