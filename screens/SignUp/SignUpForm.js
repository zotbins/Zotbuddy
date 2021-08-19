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
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import BackArrow from '../../assets/svgs/BackArrow.svg'


const SignUpForm =  props  => {
  const { register, setValue, getValues, errors } = useForm()
  const [firstNameInputColor, setFirstNameInputColor] = useState('black')
  const [lastNameInputColor, setLastNameInputColor] = useState('black')
  const [emailInputColor, setEmailInputColor] = useState('black')
  const [passInputColor, setPassInputColor] = useState('black')
  const [marginTop, setMarginTop] = useState(100)
  const navigation = useNavigation()

  const onSignUp = async (_) => {
    const email = getValues('email')
    const password = getValues('password')
    const firstname = getValues('firstname')
    const lastname = getValues('lastname')

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
    }
    catch(error){
      console.log(error.toString())
    }
  }
  
  useEffect(() => {
    register({name: 'firstname'}, {required: true})
    register({name: 'lastname'},{required: true})
    register({ name: 'email'}, { required: true })
    register({ name: 'password'}, { required: true })
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

  return (<KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <BackArrow onPress={() => navigation.navigate('Login')} style={styles.backArrowImage} />
    
          <Text style={styles.title}>Create Account</Text>
        </View>
      <View style={[styles.loginBox, {marginTop: marginTop}]}>
      <Text style={styles.helperText}>
          Don't worry, you can always change this information later.
        </Text>
      <Text style={styles.label}>First Name</Text>
      <TextInput
          style={[styles.input, { borderColor: firstNameInputColor }]}
          onFocus={() => setFirstNameInputColor('#6AA2B8')}
          onBlur={() => setFirstNameInputColor('black')}
        onChangeText = {text => setValue('firstname', text, true)}
      />
      {errors.firstname && <Text>This is required.</Text>}

      <Text style={styles.label}>Last Name</Text>
      <TextInput
          style={[styles.input, { borderColor: lastNameInputColor }]}
          onFocus={() => setLastNameInputColor('#6AA2B8')}
          onBlur={() => setLastNameInputColor('black')}
        onChangeText = {text => setValue('lastname', text, true)}
      />
      {errors.lastname && <Text>This is required.</Text>}

      <Text style={styles.label}>Email</Text>
      <TextInput
          style={[styles.input, { borderColor: emailInputColor }]}
          onFocus={() => setEmailInputColor('#6AA2B8')}
          onBlur={() => setEmailInputColor('black')}
        onChangeText={text => setValue('email', text, true)}
      />
      {errors.email && <Text>This is required.</Text>}

      <Text style={styles.label}>Password</Text>
      <TextInput
          style={[styles.input, { borderColor: passInputColor }]}
          onFocus={() => setPassInputColor('#6AA2B8')}
          onBlur={() => setPassInputColor('black')}
        secureTextEntry={true}
        onChangeText={text => setValue('password', text, true)}
      />
      {errors.password && <Text>This is required.</Text>}


        {/* <Text style={[styles.label, { color: userInputColor }]}>Email</Text>
        <TextInput
          style={[styles.input, { borderColor: userInputColor }]}
          onFocus={() => setUserInputColor('#6AA2B8')}
          onBlur={() => setUserInputColor('black')}
          onChangeText={(text) => setValue('email', text, true)}
        />

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
        {errors.password && <Text>This is required.</Text>} */}

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
    // <View style={styles.container}>
    //   <Text style={styles.label}>First Name</Text>
    //   <TextInput
    //     style = {styles.input}
    //     onChangeText = {text => setValue('firstname', text, true)}
    //   />
    //   {errors.firstname && <Text>This is required.</Text>}

    //   <Text style={styles.label}>Last Name</Text>
    //   <TextInput
    //     style = {styles.input}
    //     onChangeText = {text => setValue('lastname', text, true)}
    //   />
    //   {errors.lastname && <Text>This is required.</Text>}

    //   <Text style={styles.label}>Email</Text>
    //   <TextInput
    //     style={styles.input}
    //     onChangeText={text => setValue('email', text, true)}
    //   />
    //   {errors.email && <Text>This is required.</Text>}

    //   <Text style={styles.label}>Password</Text>
    //   <TextInput
    //     style={styles.input}
    //     secureTextEntry={true}
    //     onChangeText={text => setValue('password', text, true)}
    //   />
    //   {errors.password && <Text>This is required.</Text>}

    
    //   <Button title="Sign Up" onPress={onSignUp} styles={{marginBottom: 20}} />
    //   <Text></Text>
    //   <Button title="Back" onPress={() => props.navigation.goBack()} />
      
      
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    padding: 3,
    paddingBottom: 20,
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
})

export default SignUpForm;
