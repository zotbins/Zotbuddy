import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'


const LoginForm =  props  => {
  const { register, setValue, getValues, errors } = useForm()
  const navigation = useNavigation()


  const goToForgotPasswordPage = () => {
    navigation.navigate("ForgotPassword")
  }

  const toMain = () => {
    navigation.navigate("Main")
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
          console.log("Hey there!")
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
      <Button title="to main" onPress={toMain} style = {styles.button} />

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
