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
import firebase from 'firebase'
import 'firebase/firestore'
import * as SecureStore from 'expo-secure-store'
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

import ProgressCircle from 'react-native-progress-circle'
import MapPage from '../Map/MapPage'
import Leaderboard from '../Trivia/Leaderboard'

import uciDiningLogo from '../../assets/images/UCIDining_logo.png'
import zotbinsLogo from '../../assets/images/ZotBins_logo_slow_blink.gif'
import zotBuddyLogo from '../../assets/images/petr.jpg'
import { Constants } from 'expo-barcode-scanner'
import { TouchableOpacity } from 'react-native-gesture-handler'
import SmileySvg from '../../assets/svgs/smiley.svg'
import { useEffect } from 'react'

const HomePage = (props) => {
  const [quizDone, setQuizDone] = useState(false);
  const [checkQuiz, setCheckQuiz] = useState(true);
  const [quizPoints, setQuizPoints] = useState(0);
  const [boolean, setBoolean] = useState(true); 
  const navigation = useNavigation()


  useEffect(() => {
    if (checkQuiz) {
      console.log('here')
      isQuizDone();
    }
    console.log('here')
    console.log(quizDone);
    

  });

  const toHome = useCallback(() => {
    navigation.navigate('Trivia')
  }, [])

  const isQuizDone = async (_) => {
    console.log("test")
    const dbh = firebase.firestore()
    console.log("test")
    let userId = await SecureStore.getItemAsync('uid');
    let doc = await dbh.collection("users").doc(userId).get()
    let dataObj = doc.data()
    let month = dataObj.dateSignedIn.substring(0, 2)
    let day = dataObj.dateSignedIn.substring(3, 5)
    let year = dataObj.dateSignedIn.substring(6, 10)
    let date = new Date()

    if(dataObj.showQuiz == 1){
      console.log('Here')
      setQuizDone(false)
      
    }

    else if (dataObj.showQuiz == 0 && month == (date.getMonth() + 1).toString() && day == (date.getDate()).toString()
        && year == (date.getFullYear()).toString()){
          console.log('Here2')
          setQuizDone(true)
          setQuizPoints(dataObj.points)
    }

    else if(dataObj.showQuiz == 0 && (month != (date.getMonth() + 1).toString() || day != (date.getDate()).toString()
    || year != (date.getFullYear()).toString())){
      dbh.collection('users').doc(userId).update({
        showQuiz: 1,
        dateSignedIn: (date.getMonth() + 1).toString() + "/" + (date.getDay()).toString() + "/" + (date.getFullYear()).toString()
      })
      console.log('Here3')
      setQuizDone(false)
    }

    else{
      console.log('Here4')
      setQuizDone(true)
      setQuizPoints(dataObj.points)
    }
    setCheckQuiz(false)
  }
  return (
    // <SafeAreaView style={styles.container}>
    // <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow:1}}>    
    <View style={styles.container}>
      <Button onPress={isQuizDone}></Button>
    <View style={styles.welcome}>
      <Text style={styles.nameStyle}>Welcome back, _____</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileButton}>
        <SmileySvg style={styles.smile}/>
      </TouchableOpacity>
    </View>


    <View style={styles.topText}>
    <Text style={styles.textStyle}>Daily Trivia</Text>
    </View>
    {quizDone ?
    <View style={styles.trivia}>
    <ProgressCircle
        percent={quizPoints/5 * 100}
        radius={50}
        borderWidth={5}
        color="#94C83D"
        shadowColor="#E4E0DB"
        bgColor="#fff"
    >
        <Text style={{ fontSize: 24 }}>{quizPoints.toString() + '/5'}</Text>
    </ProgressCircle>
    <Text style={{fontSize: 20}}>Nice Try!</Text>
    <Text style={{fontSize: 20}}>You scored {quizPoints}/5 on today's quiz</Text>
    <TouchableOpacity style={styles.finished_button}>
      <Text
        style={{ color: '#6AA2B8', textAlign: 'center' }}
        onPress={toHome}
      >
        Review Results
      </Text>
    </TouchableOpacity>
  </View>
    :
    <View style={styles.trivia} >
      <Text>Take today’s quiz to boost your ranking!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Trivia')} style={styles.button}>
        <Text style={{color: "#6AA2B8", textAlign: 'center'}}>Take Quiz</Text>
      </TouchableOpacity>
    </View>
    
      }

    <View style={styles.topText}>
      <Text style={styles.textStyle}>Leaderboard</Text>
      <Text onPress={() => navigation.navigate('Leaderboard')} style={styles.seeMore}>See More</Text>
    </View>
    <View style={styles.leaderboard}>
      <Leaderboard />
    </View>

    <View style={styles.topText}>
      <Text style={styles.textStyle}>Nearby Zotbins</Text>
      <Text onPress={() => navigation.navigate('Map')} style={styles.seeMore}>See More</Text>
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
    flexGrow: 1,
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
