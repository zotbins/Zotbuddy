import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';


const LoginForm =  props  => {
  const { register, setValue, getValues, errors } = useForm()
  const navigation = useNavigation()



  logInwithFacebookAsync = async() => {
    /* This method handles the Facebook authentication */
    try {
      await Facebook.initializeAsync({
        appId: '984282755681388',
      });
      const {type, token} = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      
      if (type === 'success') {
        // Get the user's information using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?fields=email,name
        &access_token=${token}`);
        const body = await response.json();
          const firstName = body.name.split(' ')[0];
          const LastName = body.name.split(' ')[1];

          try{
            firebase.auth().createUserWithEmailAndPassword(body.email, "123456").then(async (res) => {
              if (SecureStore.isAvailableAsync()) {
                await storeItem('uid', res.user.uid)
                const dbh = firebase.firestore()
                
                dbh.collection('users').doc(res.user.uid).set({
                  firstname: firstName,
                  lastname: LastName,
                  email: body.email,
                  password: "123456",
                  points: 0,
                })
                
                navigation.navigate("Main")
              } else {
                console.log('SecureStore unavailable')
              }
            }).catch(error => {
                  if (error.code == 'auth/email-already-in-use'){
                      navigation.navigate("Main")
                  }
            })
          }
          catch(error){
            console.log("Error is");
            console.log(error, body.email)
          }
  
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  isUserEqual = (googleUser, firebaseUser) => {

    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
            providerData[i].uid === googleUser.getAuthResponse().id_token) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  }

  
  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (! isUserEqual(googleUser, firebaseUser)) {
       var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
       ); //ending credential
          firebase.auth().signInWithCredential(credential).then(function(result){
              //if (result.additionalUserInfo.isNewUser()){
                if (SecureStore.isAvailableAsync()) {
                  //await storeItem('uid', res.user.uid)
                  const dbh = firebase.firestore()
                  dbh.collection('users').doc(result.user.uid).set({
                    firstname: result.additionalUserInfo.profile.given_name,
                    lastname: result.additionalUserInfo.profile.family_name,
                    email: result.user.email,
                    password: "123456",
                    points: 0,
                  })
                  
                } else {
                  console.log('SecureStore unavailable')
                }


          }); //ending sign in with credential

      }//ending isUserEqual
    }); //ending unsubscribe
  }
  

 
  signInWithGoogleAsync = async() => {
    /* This function handles the Google Sign In feature*/
    try {
      const result = await Google.logInAsync({
        androidClientId: '400197254537-hingemon30b2n4te4fn4q5tv6al62rc3.apps.googleusercontent.com',
        iosClientId: '400197254537-fpup3uamt8eieirpn1g1k8kpv9houqd8.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        onSignIn(result);
        navigation.navigate('Main');
        return result.accessToken
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  const goToForgotPasswordPage = () => {
    navigation.navigate("ForgotPassword")
  }

  const onLogin = async (_) => {
    //TODO
    //fix onLogin to operate like onSignUp
    const email = getValues('email')
    const password = getValues('password')
    console.log("Hey there1!")
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(async (res) => {
        console.log("Hey there!")
        if (SecureStore.isAvailableAsync()) {
          console.log(res.user.id);
          await storeItem('uid', res.user.uid)
          
          navigation.navigate("Main")
        } else {
          console.log('SecureStore unavailable')
        }
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }

  useEffect(() => {
    register({ name: 'email'}, { required: true })
    register({ name: 'password'}, { required: true })
  }, [register])

  console.log(errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('email', text, true)}
      />
      {errors.email && <Text>This is required.</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={text => setValue('password', text, true)}
      />
      {errors.password && <Text>This is required.</Text>}
      
      <Text style={styles.label}> </Text>

      <Button title="Log In" onPress={onLogin} style = {styles.button}/>

      <Text style={styles.label}> </Text>

      <Button title="Forgot Password" onPress={goToForgotPasswordPage} style = {styles.button}/>

      <Text style={styles.label}> </Text>
      
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} style = {styles.button} />

      <Text style={styles.label}> </Text>
      <Button title = "Sign In With Google" onPress={() => signInWithGoogleAsync()}/>

      <Button title = "Sign In with Facebook" onPress={() => logInwithFacebookAsync()}></Button>

    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0
  },
  button :{
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    width: '100%',
    backgroundColor: '#0e101c'
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  }
})

export default LoginForm;
