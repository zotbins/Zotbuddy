import React, { useState } from 'react'
import { 
  Dimensions,
  StyleSheet, 
  View,
  Pressable,
  ScrollView
} from 'react-native'
import { Path, Svg } from 'react-native-svg'
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
  CardItem,
} from 'native-base'

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
          <Path
            fill='#79D6FB'
            d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'
          />
        </Svg>
      </View>
    </View>
  )
}


const HomePage = props => {
  return (
    <ScrollView style={styles.container}>

      <BackgroundHeader/>
      
      <View style={styles.contentContainer}>
        <H1 style = {{textAlign: "center", fontWeight: "bold"}}>
        UCI Dining + Zotbins About Us
        </H1>
        <View style = {{height: "80%",width: "94%", alignSelf: "center", marginTop: 10, justifyContent: "space-between"}}>
          <Text>
            UCI Dining Services is committed to providing sustainable practices in services, food and products, how we manage waste and how we educate the campus community.
          </Text>
          
          <Text>
            UCI Dining proudly supports the sustainability goals of the University of California Office of the President (UCOP) in reducing waste and greenhouse gas emissions and increasing the sustainable foods we offer.
          </Text>
          
          <Text>
            Most recently, UCI Dining has collaborated with Zotbins to bring you this app to help with proper waste disposal, learn new zero waste knowledge through trivia, and bring you the latest UCI Dining & Sustainability news and events.
          </Text>
          
          <Text>
            Zotbins was created by ZerO Waste Anteaters (ZOWA), an independent group of undergraduate researchers, who are focused on technology-based zero waste management. 
          </Text>

          <Text>
            ZotBins is a smart waste bin system that collects data to help make waste management more efficient and to promote zero waste.
          </Text>
          
          <Text>
            One aspect of this project consists of physical  “smart bins” deployed in various locations (i.e. buildings, college campuses, cities) that can accurately measure and record the amount of waste in each bin most with a digital display that gives waste disposal instructions.
          </Text>

          <Text>
            Another part of this project includes the web app which provides functionality to help facilities management in cultivating a sustainable campus, while the mobile app seeks to engage users in more environmentally-conscious practices.
          </Text>

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf3f6'
  },
  contentContainer: {
    marginTop: 34,
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 35
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  categoryTitleText: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 24
  },
  categoryText: {
    fontSize: 10
  },
  buttonRowContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default HomePage