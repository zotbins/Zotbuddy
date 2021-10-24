import React, { useState } from 'react'
import { 
  Dimensions,
  StyleSheet,
  Image,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity
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
import AboutZotbin from '../../assets/svgs/AboutZotbin.svg'
import Instagram from '../../assets/svgs/Instagram.svg'
import DropdownDown from '../../assets/svgs/DropdownDown.svg'
import DropdownUp from '../../assets/svgs/DropdownUp.svg'
import { useNavigation } from '@react-navigation/native'

/**
 * Styles need to be refactored for different platforms
 * This is just a quick MVP
 */

//Temporary
//https://heartbeat.fritz.ai/creating-custom-wavy-headers-using-react-native-svg-639ce0861327
/*const BackgroundHeader = () => {
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
}*/


const AboutPage = props => {


  const navigation = useNavigation()
  const [zotbinsDropdown, setZotbinsDropdown] = useState(true)
  const [uciDiningDropdown, setUciDiningDropdown] = useState(true)

  const toSocialMedia = () => {
    navigation.navigate("SocialMedia")
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{marginHorizontal: 0}}>
      <View style = {{width: "90%", alignSelf: "center", marginTop: 10, marginBottom: 20, justifyContent: "space-between"}}>
        {/* <Image style={styles.zotBuddyLogo} source={zotBuddyLogo}/> */}
        <Text style={styles.title}>About Us</Text>
        <Card>
          <CardItem style={{marginBottom: 0}}>
              <Body style={styles.categoryAlign}>
                <View style={styles.categoryTitle}>
                <AboutZotbin />
                <Text style={styles.categoryTitleText}>ZotZero</Text>
                </View>
                <Text style={styles.categoryText}>
                ZotZero can helo you better waste practices for the item at hand, learn about sustainable practices through fun trivia, and can bring you the latest UCI Dining & Sustainability news and events!
                </Text>
                <Text style={styles.categorySecondaryTitle}>Our Mission</Text>
                <Text style={styles.categoryText}>
                We hope that using ZotZero will engage users in more environmentally-conscious practices and help promote the practice of zero waste!
                </Text>
              </Body>
          </CardItem>
        </Card>
      </View>
      <TouchableOpacity onPress={toSocialMedia} style={styles.button}><Instagram /><Text style={{color: 'white'}}>Find us on Instagram</Text></TouchableOpacity>
        <Text style={styles.secondTitle}>Partners</Text>
      <View style = {{width: "90%", alignSelf: "center", marginTop: 10, marginBottom: 0, justifyContent: "space-between"}}>
        {/* <Image style={styles.zotBuddyLogo} source={zotBuddyLogo}/> */}
        <Card>
          <CardItem style={{marginBottom: 0}}>
                
                {zotbinsDropdown ? <Body style={styles.categoryAlign}><View style={styles.categoryTitle}>
                <AboutZotbin />
                <Text style={styles.categoryMinimizedTitleText}>ZotBins</Text>
                <TouchableOpacity style={styles.dropdownButtonDown} onPress={() => setZotbinsDropdown(false)}><DropdownDown style={{Self: "flex-end"}}/></TouchableOpacity>
                </View></Body>
                :
                <Body style={styles.categoryAlign}>
                <View style={styles.categoryTitle}>
                <AboutZotbin />
                <Text style={styles.categoryTitleText}>ZotBins</Text>
                </View>
                <Text style={styles.categoryText}>
                ZotBins is a smart space initiative that provides holistic feedback through waste data and encourages
                      the practice of zero waste. It consists of 3 parts: the hardware "smart trash bins", a web app with tools
                      for facilities management, and this mobile app!                  </Text>
                <Text style={styles.categorySecondaryTitle}>Our Mission</Text>
                <Text style={styles.categoryText}>
                We hope that using ZotBuddy will engage users in more environmentally-conscious practices and help
                  promote the practice of zero waste!
                </Text><TouchableOpacity onPress={() => setZotbinsDropdown(true)}><DropdownUp style={styles.dropdownButtonUp}/></TouchableOpacity></Body>}
              
          </CardItem>
        </Card>
      </View>
      <View style = {{width: "90%", alignSelf: "center", marginTop: 5, marginBottom: 20, justifyContent: "space-between"}}>
        {/* <Image style={styles.zotBuddyLogo} source={zotBuddyLogo}/> */}
        <Card>
          <CardItem style={{marginBottom: 0}}>
                
                {uciDiningDropdown ? <Body style={styles.categoryAlign}><View style={styles.categoryTitle}>
                <AboutZotbin />
                <Text style={styles.categoryMinimizedTitleText}>UCI Dining</Text>
                <TouchableOpacity style={styles.dropdownButtonDown} onPress={() => setUciDiningDropdown(false)}><DropdownDown /></TouchableOpacity>
                </View></Body>
                :
                <Body style={styles.categoryAlign}>
                <View style={styles.categoryTitle}>
                <AboutZotbin />
                <Text style={styles.categoryTitleText}>UCI Dining</Text>
                </View>
                <Text style={styles.categoryText}>
                UCI Dining proudly supports the sustainability goals of the University of California Office of the President (UCOP) in reducing waste and greenhouse gas emissions and increasing the sustainable foods we offer on campus.
                </Text>
                <Text style={styles.categorySecondaryTitle}>Our Mission</Text>
                <Text style={styles.categoryText}>
                UCI Dining Services is committed to providing sustainable practices in services, food and products, how we manage waste and how we educate the campus community.</Text>
                <Text style={styles.categorySecondaryTitle}>Contact Us</Text>
                <Text style={styles.categoryText}>https://food.uci.edu/</Text>
                <Text style={styles.categoryText}>(949)824-1492</Text>

                <TouchableOpacity onPress={() => setUciDiningDropdown(true)}><DropdownUp style={styles.dropdownButtonUp}/></TouchableOpacity></Body>}
              
          </CardItem>
        </Card>
      </View>
    
       </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf3f6',
    // alignItems: 'center'
  },
  button: {
    marginBottom: 20,
    borderRadius: 20,
    width: 200,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0064A4',
    alignSelf: "center"
    
  },
  dropdownButtonDown: {
    alignSelf: "center", 
    marginLeft: 'auto'
  },
  dropdownButtonUp: {
    alignSelf: "center", 
    marginLeft: '95%'
  },
  title: {
    marginTop: 60,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: '700',
    color: '#0064A4',
    alignSelf: 'center'
  },
  secondTitle: {
    marginTop: 20,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: '700',
    color: '#0064A4',
    alignSelf: 'center'
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  categoryMinimizedTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6AA2B8',
    marginLeft: 13
  },
  categoryTitle: {
    flexDirection: 'row',
    width: '100%'

  },
  categoryTitleText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#6AA2B8',
    marginBottom: 12,
    marginLeft: 13
  },
  categorySecondaryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555759',
    marginBottom: 3,
    marginTop: 15
  },
  categoryAlign: {
    justifyContent: 'center',

  },
  categoryText: {
    fontSize: 15,
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

export default AboutPage