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
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
//import BackArrow from '../../assets/svgs/BackArrow.svg'
import Input from "../../components/Input";

const SignUpForm =  props  => {
  const { control, register, setValue, getValues, errors } = useForm()
  const [err, setErr] = useState(null)
  const [firstNameInputColor, setFirstNameInputColor] = useState('black')
  const [lastNameInputColor, setLastNameInputColor] = useState('black')
  const [emailInputColor, setEmailInputColor] = useState('black')
  const [passInputColor, setPassInputColor] = useState('black')
  const [marginTop, setMarginTop] = useState(100)
  const navigation = useNavigation()

  const clearLoginError = () => {
    setErr(null)
  }

  const onSignUp = async (_) => {
    const email = getValues('email')
    const password = getValues('password')
    const firstname = getValues('firstname')
    const lastname = getValues('lastname')

    if (email == "" || password == "" || firstname == "" || lastname == ""){
      console.log("Came here")
      return;
    }

    try{
      firebase.auth().createUserWithEmailAndPassword(email, password).then(async (res) => {
        if (SecureStore.isAvailableAsync()) {
          await storeItem('uid', res.user.uid)
          const dbh = firebase.firestore()
          
          date = new Date()
          dbh.collection('users').doc(res.user.uid).set({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            points: 0,
            dateSignedIn: (date.getMonth() + 1).toString() + "/" + (date.getDay()).toString() + "/" + (date.getFullYear()).toString(),
            showQuiz: 1
          })
          
          navigation.navigate("Main")
        } else {
          console.log('SecureStore unavailable')
        }
      })
      .catch(error => {
        console.log(error.toString())
        if (error.toString() == "Error: The email address is already in use by another account."){
          clearLoginError()
          setErr("The email address is already in use")
        }
        else if (error.toString() == "Error: The email address is badly formatted."){
          clearLoginError()
          setErr("Invalid Email Format")
        }
        else if (error.toString() == "Error: Password should be at least 6 characters"){
          clearLoginError()
          setErr("Password should be at least 6 characters")
        }
      
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setMarginTop(50)// or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setMarginTop(100); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [register])

  console.log(errors)

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Create Account</Text>
      <View style={[styles.loginBox, {marginTop: marginTop}]}> 
      <Text style={styles.helperText}>
          Don't worry, you can always change this information later.
      </Text>
      <Text style={styles.label}>First Name</Text>
      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="firstname"
                otherStyles={styles}
                style={[styles.input, { borderColor: 'black' }]}
                value={value}
                placeholder = "First Name"
                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('firstname', text, true)}
                }
                onFocus={() => 
                  {setFirstNameInputColor('green')
                  console.log("Hi i am on focus")
                }
                }
                onBlur={() => setFirstNameInputColor('black')}
              />
    
            )}
            name="firstname"
            rules={{
              required: {
                value:true,
                message: 'First Name is required'
              }
            }}
          />


      <Text style={styles.label}>Last Name</Text>

      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="lastname"
                otherStyles={styles}
                style={[styles.input, { borderColor: 'black' }]}
                value={value}
                placeholder = "Last Name"
                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('lastname', text, true)}}
                onFocus={() => setFirstNameInputColor('#6AA2B8')}
                onBlur={() => setFirstNameInputColor('black')}
              />
    
            )}
            name="lastname"
            rules={{
              required: {
                value:true,
                message: 'Last Name is required'
              }
            }}
          />


      <Text style={styles.label}>Email</Text>

      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="email"
                otherStyles={styles}
                style={[styles.input, { borderColor: 'black' }]}
                value={value}
                placeholder = "Email"
                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('email', text, true)}}
              />
    
            )}
            name="email"
            rules={{
              required: {
                value:true,
                message: 'Email is required'
              }
            }}
          />


      <Text style={styles.label}>Password</Text>

      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="password"
                otherStyles={styles}
                style={[styles.input, { borderColor: 'black' }]}
                secureTextEntry={true}
                value={value}
                placeholder = "Password"

                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('password', text, true)}}
                onFocus={() => setFirstNameInputColor('#6AA2B8')}
                onBlur={() => setFirstNameInputColor('black')}
              />
    
            )}
            name="password"
            rules={{
              required: {
                value:true,
                message: 'Password is required'
              }
            }}
          />

      {err && <Text style= {styles.errorText}> {err} </Text>}

      <TouchableOpacity
          style={[styles.button, { backgroundColor: '#0064A4' }]}
          onPress={onSignUp}
        >
          <Text style={[styles.buttonText, { color: 'white' }]}>Finish</Text>
        </TouchableOpacity>
        {/* 
    <Button title = "Sign In With Google" onPress={() => signInWithGoogleAsync()}/>
    <Button title = "Sign In with Facebook" onPress={() => logInwithFacebookAsync()}></Button> */}
      </View>
      <View style={styles.bottom}>
        <Text
          onPress={() => navigation.navigate('Login')}
          style={styles.signUp}
        >
          Already have an account?{' '}
          <Text style={{ fontWeight: 'bold' }}>Sign in here!</Text>
        </Text>
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    marginTop: 0,
    width: '100%',
    backgroundColor: '#F4F4F4',
  },
  header: {
    backgroundColor: 'pink',
    flex: .2,
    flexDirection: 'column',
    alignItems: 'center',
    width: '95%',

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
    padding: 0,
    paddingBottom: 10,
    width: '92%',
    overflow: 'visible',
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

    marginTop: 10,
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
  helperText: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    color: '#6AA2B8',
  },
  backArrowImage: {
    alignSelf: 'flex-start',
    marginBottom: 90,
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
    marginTop: 40,
    marginBottom: 40,
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
  errorText: {
    alignSelf: 'flex-start',
    paddingTop: 0,
    paddingLeft: 20,
    flexDirection: 'column',
    color: '#fa4646'
}
})

export default SignUpForm;
