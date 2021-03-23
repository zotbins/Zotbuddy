import React, { useState } from 'react'
import { 
  Dimensions,
  StyleSheet,
  Image,
  View,
  Pressable,
  ScrollView
} from 'react-native'
import { Rect, Svg } from 'react-native-svg'
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

import uciDiningLogo from '../../assets/images/UCIDining_logo.png'
import zotbinsLogo from '../../assets/images/ZotBins_logo_slow_blink.gif'
import zotBuddyLogo from '../../assets/images/petr.jpg'

/**
 * Styles need to be refactored for different platforms
 * This is just a quick MVP
 */

//Temporary
//https://heartbeat.fritz.ai/creating-custom-wavy-headers-using-react-native-svg-639ce0861327
const BackgroundHeader = () => {
  return (
    <View style={styles.svgCurve}>
      <View style={{ backgroundColor: '#79D6FB', height: 160 }}>
        <Svg
          height='60%'
          width='100%'
          viewBox='0 0 1440 320'
          style={{ position: 'absolute', top: 130 }}
        >
          <Rect
            fill='#79D6FB'
          />
        </Svg>
      </View>
    </View>
  )
}


const HomePage = props => {
  return (
    <Container style={styles.container}>
       <Tabs>
       <Tab heading="ZotBuddy" tabStyle={styles.tabs} activeTabStyle={styles.tabs} textStyle={{color: 'white'}}>
       <BackgroundHeader/>

        <View style = {{width: "94%", alignSelf: "center", marginTop: 10, marginBottom: 20, justifyContent: "space-between"}}>
          <Image style={styles.zotBuddyLogo} source={zotBuddyLogo}/>
          <Card>
            <CardItem style={{marginBottom: 15}}>
                <Body style={styles.categoryAlign}>
                  <Text style={styles.categoryTitleText}>What is ZotBuddy?</Text>
                  <Text style={styles.categoryText}>
                    ZotBuddy can help you better waste practices for the item at hand, learn about sustainable
                    practices through fun trivia, and can bring you the latest UCI Dining & Sustainability news and events!
                  </Text>
                  <Text style={styles.categoryTitleText}>Our Goal</Text>
                  <Text style={styles.categoryText}>
                    We hope that using ZotBuddy will engage users in more environmentally-conscious practices and help
                    promote the practice of zero waste!
                  </Text>
                </Body>
            </CardItem>
          </Card>
        </View>
       </Tab>

       <Tab heading="ZotBins" tabStyle={styles.tabs} activeTabStyle={styles.tabs} textStyle={{color: 'white'}}>
        <BackgroundHeader/>
        <View style = {{width: "94%", alignSelf: "center", marginTop: 10, marginBottom: 20, justifyContent: "space-between"}}>
          <Image style={styles.zotLogo} source={zotbinsLogo}/>
          <Card>
            <CardItem style={{marginBottom: 15}} >
                <Body style={styles.categoryAlign}>
                    <Text style={styles.categoryTitleText}>What is Zotbins?</Text>
                    <Text style={styles.categoryText}>
                        ZotBins is a smart space initiative that provides holistic feedback through waste data and encourages
                        the practice of zero waste. It consists of 3 parts: the hardware "smart trash bins", a web app with tools
                        for facilities management, and this mobile app!
                    </Text>
                    <Text style={styles.categoryTitleText}>ZerO Waste Anteaters</Text>
                    <Text style={styles.categoryText}>
                        Zotbins was created in 2017 by ZerO Waste Anteaters (ZOWA), an independent group of undergraduate researchers,
                        who are focused on technology-based zero waste management. ZOWA, in collaboration with UCI Dining have developed ZotBuddy!
                    </Text>
                </Body>
            </CardItem>
           </Card>
        </View>
        </Tab>

       <Tab heading="UCI Dining" tabStyle={styles.tabs} activeTabStyle={styles.tabs} textStyle={{color: 'white'}}>
       <BackgroundHeader/>
        <View style = {{width: "94%", alignSelf: "center", marginTop: 10, marginBottom: 20, justifyContent: "space-between"}}>
          <Image style={styles.diningLogo} source={uciDiningLogo}/>
          <Card>
            <CardItem style={{marginBottom: 15}} >
                <Body style={styles.categoryAlign}>
                  <Text style={styles.categoryTitleText}>What is UCI Dining?</Text>
                  <Text style={styles.categoryText}>
                    UCI Dining proudly supports the sustainability goals of the University of California Office of the President (UCOP) in reducing waste and greenhouse gas emissions and increasing the sustainable foods we offer on campus.
                  </Text>
                  <Text style={styles.categoryTitleText}>Our Mission</Text>
                  <Text style={styles.categoryText}>
                    UCI Dining Services is committed to providing sustainable practices in services, food and products, how we manage waste and how we educate the campus community.
                  </Text>
                </Body>
            </CardItem>
          </Card>
        </View>
       </Tab>
       </Tabs>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf3f6'
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  categoryTitleText: {
    fontWeight: 'bold',
    fontSize: 27,
    alignSelf: 'center',
    color: '#484848',
    marginBottom: 12,
    marginTop: 15
  },
  categoryAlign: {
    justifyContent: 'center',
    marginBottom: 10
  },
  categoryText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#606060',
  },
  zotLogo: {
    height: 130,
    width: 348,
    margin: 10,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  diningLogo: {
    resizeMode: 'contain',
    height: 120,
    width: 300,
    marginTop: 30,
    alignSelf: 'center'
  },
  zotBuddyLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 120,
    width: 335,
    marginTop: 15,
    marginBottom: 15,
  },
  tabs: {
    backgroundColor: '#79D6FB',
  },
})

export default HomePage