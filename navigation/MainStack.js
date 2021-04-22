import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'native-base'

import HomePage from '../screens/Home/HomePage'
import ScannerPage from '../screens/Scanner/ScannerPage'
import ProfilePage from '../screens/Profile/ProfilePage'
import TriviaPage from '../screens/Trivia/TriviaPage'
import EventsPage from '../screens/Events/EventsPage'
import SocialFeedPage from '../screens/SocialFeed/SocialFeedPage'

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
        <Tab.Screen name='Trivia' component={TriviaPage} />
        <Tab.Screen name='Scanner' component={ScannerPage} />
        <Tab.Screen name='Profile' component={ProfilePage} />
        <Tab.Screen name='Events' component={EventsPage} />
        <Tab.Screen name='SocialFeed' component={SocialFeedPage} />
      </Tab.Navigator>
  )
}

export default MainStack