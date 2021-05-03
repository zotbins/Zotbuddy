import React, { useState } from 'react'
import { useEffect } from 'react'
import { 
  Dimensions,
  StyleSheet, 
  View,
} from 'react-native'
import { Path, Svg } from 'react-native-svg'
import ProfileForm from './ProfileForm'
import * as firebase from 'firebase'
import 'firebase/firestore'
import * as SecureStore from 'expo-secure-store'


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

const ProfilePage = props => {
  const [display, setDisplay] = useState({})
  const displayData = async (_) => {
    const dbh = firebase.firestore()
    let userId = await SecureStore.getItemAsync('uid');
    let doc =  await dbh.collection("users").doc(userId).get()

    if (!doc.exists){
      setDisplay({})
    }
    else{
      let dataObj = doc.data()
      setDisplay({
        firstname: dataObj.firstname,
        lastname: dataObj.lastname,
        email: dataObj.email,
        points: dataObj.points
      })
      //setValue("firstname", dataObj.firstname, true)
      //setValue("lastname", dataObj.lastname, true)
      //setValue("email", dataObj.email, true)
      //setValue("points", dataObj.points, true)}
    }
  }

  useEffect (() => {
    async function cover() {
      displayData()
    }
    cover()

  }, [])

  if (display == {}){
    return <></>
  }
  else{
    return (
      <ProfileForm blood = {display}/>
    )
  }
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

export default ProfilePage;