import React, { useState, useCallback } from 'react'
import {
  Dimensions,
  StyleSheet,
  Image,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native'
import { Rect, Svg } from 'react-native-svg'
import { useNavigation } from '@react-navigation/native'
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  H1,
  Button,
  Card,
  Tabs,
  Tab,
  CardItem,
} from 'native-base'

import MapPage from '../Map/MapPage'
import Leaderboard from '../Trivia/Leaderboard'

import uciDiningLogo from '../../assets/images/UCIDining_logo.png'
import zotbinsLogo from '../../assets/images/ZotBins_logo_slow_blink.gif'
import zotBuddyLogo from '../../assets/images/petr.jpg'
import { Constants } from 'expo-barcode-scanner'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SmileySvg from '../../assets/svgs/smiley.svg'

const HomePage = (props) => {
  const navigation = useNavigation()

  const toHome = useCallback(() => {
    navigation.navigate('Trivia')
  }, [])

  const toLeaderBoard = useCallback(() => {
    navigation.navigate('Leaderboard')
  }, [])


  return (
    // <SafeAreaView style={styles.container}>
    // <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow:1}}>
    <View style={styles.container}>
      <View style={styles.welcome}>
        <Text style={styles.nameStyle}>Welcome back, _____</Text>
        <TouchableOpacity style={styles.profileButton}>
          <SmileySvg style={styles.smile} />
        </TouchableOpacity>
      </View>

      <View style={styles.topText}>
        <Text style={styles.textStyle}>Daily Trivia</Text>
      </View>
      <View style={styles.trivia}>
        <Text>Take today’s quiz to boost your ranking!</Text>
        <TouchableOpacity style={styles.button}>
          <Text
            style={{ color: '#6AA2B8', textAlign: 'center' }}
            onPress={toHome}
          >
            Take Quiz
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.topText}>
        <Text style={styles.textStyle}>Leaderboard</Text>
        <Text 
            style={styles.seeMore} 
            onPress={toLeaderBoard}
        >
            See More
        </Text>
      </View>
      <View style={styles.leaderboard}>
        <Leaderboard />
      </View>

      <View style={styles.topText}>
        <Text style={styles.textStyle}>Nearby Zotbins</Text>
        <Text style={styles.seeMore}>See More</Text>
      </View>
      <View style={styles.nearby_bins}>
        <MapPage />
      </View>
    </View>
    // </ScrollView>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topText: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seeMore: {
    fontSize: 14,
    color: '#6AA2B8',
  },
  smile: {
    resizeMode: 'contain',
  },
  profileButton: {
    backgroundColor: '#DCDCDC',
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  button: {
    marginTop: 5,
    borderRadius: 20,
    width: 85,
    height: 40,
    borderColor: '#6AA2B8',
    justifyContent: 'center',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
    paddingTop: Constants.statusBarHeight,
  },
  nameStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0064A4',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0064A4',
  },
  welcome: {
    paddingTop: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trivia: {
    paddingVertical: 10,
    flexShrink: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
  },
  leaderboard: {
    flexShrink: 2,
    // backgroundColor: "white",
    borderRadius: 20,
    overflow: 'hidden',
  },
  nearby_bins: {
    paddingTop: 5,
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 15,
  },
  scrollView: {
    marginHorizontal: 20,
  },
})

export default HomePage
