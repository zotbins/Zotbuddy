import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native';


const LoginForm =  props  => {
  const { register, setValue, handleSubmit, errors } = useForm()

  //TODO: Create onSubmit function...
  const onSubmit = data => console.log('submitted: ', data)
  const navigation = useNavigation();

  const onLogin = (data) => {
    const { email, password } = data
    console.log(email)
    console.log(password)
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then((res) => {
        if (SecureStore.isAvailableAsync()) {
          SecureStore.setItemAsync('uid', res.user.uid)
        } else {
          console.log('SecureStore unavailable')
        }
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }

  const onSignIn = async (data) => {
    const { email, password } = data
    try{
      firebase.auth().createUserWithEmailAndPassword(email, password).then(async (res) => {
        if (SecureStore.isAvailableAsync()) {
          await storeItem('uid', res.user.uid)
          const dbh = firebase.firestore()
          dbh.collection('users').doc(res.user.uid).set({
            email: email,
            password: password,
            points: 0,
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
        onChangeText={text => setValue('password', text, true)}
      />
      {errors.password && <Text>This is required.</Text>}

      <View style={styles.button}>
        <Button color="white" title="Button" onPress={handleSubmit(onSignIn)} />
      </View>
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
    marginTop: 40,
    color: 'white',
    backgroundColor: '#ec5990',
    height: 40,
    borderRadius: 4,
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
