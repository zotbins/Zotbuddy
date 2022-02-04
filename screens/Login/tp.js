import React, { useEffect, useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  Keyboard,
} from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
// import 'firebase/firestore'
import { firebaseDb, firebaseAuth } from '../../firebaseConfig'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook'
import ZotZeroHorizontal from '../../assets/svgs/ZotZeroHorizontal.svg'
import GoogleSvg from '../../assets/svgs/Google.svg'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Alert } from 'react-native'
import { SvgXml, SvgUri } from 'react-native-svg'
import { Row } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const LoginForm = (props) => {
  const { register, setValue, getValues, errors } = useForm()
  const navigation = useNavigation()
  const [userInputColor, setUserInputColor] = useState('black')
  const [passInputColor, setPassInputColor] = useState('black')
  let _textInputRef = null

  const testLogin = () => {
    navigation.navigate('Main')
  }

  const logInwithFacebookAsync = async () => {
    /* This method handles the Facebook authentication */
    try {
      //The appId needs to be stored in n ENV File
      await Facebook.initializeAsync({
        appId: '984282755681388',
      })
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      })

      if (type === 'success') {
        // Get the user's information using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=email,name
        &access_token=${token}`)
        const body = await response.json()
        const firstName = body.name.split(' ')[0]
        const LastName = body.name.split(' ')[1]

        try {
          firebaseAuth
            .createUserWithEmailAndPassword(body.email, '123456')
            .then(async (res) => {
              if (SecureStore.isAvailableAsync()) {
                await storeItem('uid', res.user.uid)
                const dbh = firebaseDb;

                dbh.collection('users').doc(res.user.uid).set({
                  firstname: firstName,
                  lastname: LastName,
                  email: body.email,
                  password: '123456',
                  points: 0,
                })

                navigation.navigate('Main')
              } else {
                console.log('SecureStore unavailable')
              }
            })
            .catch((error) => {
              if (error.code == 'auth/email-already-in-use') {
                navigation.navigate('Main')
              }
            })
        } catch (error) {
          console.log('Error is')
          console.log(error, body.email)
        }
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`)
    }
  }

  const isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getAuthResponse().id_token
        ) {
          // We don't need to reauth the Firebase connection.
          return true
        }
      }
    }
    return false
  }

  const onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser)
    var unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
      unsubscribe()
      if (!isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        ) //ending credential
        firebaseAuth
          .signInWithCredential(credential)
          .then(function (result) {
            //if (result.additionalUserInfo.isNewUser()){
            if (SecureStore.isAvailableAsync()) {
              //await storeItem('uid', res.user.uid)
              const dbh = firebaseDb
              dbh.collection('users').doc(result.user.uid).set({
                firstname: result.additionalUserInfo.profile.given_name,
                lastname: result.additionalUserInfo.profile.family_name,
                email: result.user.email,
                password: '123456',
                points: 0,
              })
            } else {
              console.log('SecureStore unavailable')
            }
          }) //ending sign in with credential
      } //ending isUserEqual
    }) //ending unsubscribe
  }

  const signInWithGoogleAsync = async () => {
    /* This function handles the Google Sign In feature*/
    try {
      //The android Client Id and the IOS client Id need to be stored inside of a env
      const result = await Google.logInAsync({
        androidClientId:
          '400197254537-hingemon30b2n4te4fn4q5tv6al62rc3.apps.googleusercontent.com',
        iosClientId:
          '400197254537-fpup3uamt8eieirpn1g1k8kpv9houqd8.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      })

      if (result.type === 'success') {
        onSignIn(result)
        navigation.navigate('Main')
        return result.accessToken
      } else {
        return { cancelled: true }
      }
    } catch (e) {
      return { error: true }
    }
  }

  const goToForgotPasswordPage = () => {
    navigation.navigate('ForgotPassword')
  }

  const onLogin = async (_) => {
    //TODO
    //fix onLogin to operate like onSignUp
    const email = getValues('email')
    const password = getValues('password')
    // if ((email == undefined || email == "") && (password == undefined || password == "")){
    //   console.log(email, password)
    //   alert('Invalid Credentials! Enter Email Id and Password');
    //   return;      
    // }

    if (email == undefined || email == ""){
      alert('Please Enter Email Id');
      return;
    }
    else if (password == undefined || password == ""){
      alert('Please Enter Password');
      return;
    }
    console.log('Hey there1!', email, password)
    try {
      firebaseAuth
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          console.log('Hey there!')
          if (SecureStore.isAvailableAsync()) {
            console.log(res.user.id)
            await storeItem('uid', res.user.uid)

            navigation.navigate('Main')
          } else {
            console.log('SecureStore unavailable')
          }
        })
    } catch (error) {
      console.log(error.toString())
    }
  }

  // useEffect(() => {
  //   register({ name: 'email' }, { required: true })
  //   register({ name: 'password' }, { required: true })
  // }, [register])

  changeColor = () => {}

  console.log(errors)

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <ZotZeroHorizontal style={styles.logo} />
          {/* <SvgXml style={styles.logo} source={require('../../assets/svgs/ZotZeroHorizontal.svg')} /> */}
          {/* <Image style={styles.logo} source={require("../../assets/images/ZotZero.png")} /> */}
          <Text style={styles.title}> Welcome to ZotZero!</Text>
        </View>
        
        <View style={styles.loginBox}>
          <Text style={[styles.label, { color: userInputColor }]}>Email</Text>

          <TextInput
            {...register('email', {required: true})}
            style={[styles.input, { borderColor: userInputColor }]}
            onFocus={() => setUserInputColor('#6AA2B8')}
            onBlur={() => setUserInputColor('black')}
            onChangeText={(text) => setValue('email', text, true)}
          />

          {console.log(errors)}
          {errors.email && <Text>This is required.</Text>}

          <Text style={[styles.label, { color: passInputColor }]}>
            Password
          </Text>
          <TextInput
            style={[styles.input, { borderColor: passInputColor }]}
            onFocus={() => setPassInputColor('#6AA2B8')}
            onBlur={() => setPassInputColor('black')}
            secureTextEntry={true}
            onChangeText={(text) => setValue('password', text, true)}
          />
          {errors.password && <Text>This is required.</Text>}

          <Text onPress={goToForgotPasswordPage} style={styles.forgotPassword}>
            Forgot Your Password?
          </Text>

          <Text style={styles.label}> </Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#0064A4' }]}
            onPress={onLogin}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>- or -</Text>
          <TouchableOpacity
            style={[styles.button, { borderColor: '#6AA2B8', borderWidth: 1 }]}
            onPress={() => signInWithGoogleAsync()}
        
          >
            <GoogleSvg style={styles.buttonImageGoogle} />
            {/* <Image style={styles.buttonImageGoogle} source={require("../../assets/images/Google.png")} /> */}
            <Text style={[styles.buttonText, { color: '#6AA2B8' }]}>
              Sign in with Google
            </Text>
          </TouchableOpacity>
          {/* 
      <Button title = "Sign In With Google" onPress={() => signInWithGoogleAsync()}/>

      <Button title = "Sign In with Facebook" onPress={() => logInwithFacebookAsync()}></Button> */}
        </View>
        <View style={styles.bottom}>
          <Text
            onPress={() => navigation.navigate('SignUp')}
            style={styles.signUp}
          >
            Don't have an account?{' '}
            <Text style={{ fontWeight: 'bold' }}>Sign up here!</Text>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    marginTop: 60,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    paddingBottom: 0,
  },
  loginBox: {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: { width: 10, height: 10 },
    shadowRadius: 5,
    elevation: 3,
    flexShrink: 3,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    paddingBottom: 20,
    width: '92%',
  },
  bottom: {
    flex: 1,
    marginBottom: 18,
    justifyContent: 'flex-end',
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 0,
    marginTop: 0,
  },
  title: {
    fontSize: 26,
    color: '#0064A4',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    alignSelf: 'flex-start',
    margin: 10,
    marginLeft: 30,
    marginBottom: -10,
    backgroundColor: 'white',
    zIndex: 4,
  },
  input: {
    width: '95%',
    borderWidth: 1,

    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  forgotPassword: {
    fontSize: 14,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 5,
    color: '#6AA2B8',
  },
  buttonImageGoogle: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 13,
  },
  buttonImageFb: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 6,
  },
  button: {
    marginTop: 5,
    borderRadius: 20,
    width: 250,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'black',
  },
  separator: {
    marginTop: 13,
    marginBottom: 13,
    color: '#6AA2B8',
  },
  signUp: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#0064A4',
  },
})

export default LoginForm
