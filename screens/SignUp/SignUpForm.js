import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'


const SignUpForm =  props  => {
  const { register, setValue, getValues, errors } = useForm()
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
  }, [register])

  console.log(errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <TextInput
        style = {styles.input}
        onChangeText = {text => setValue('firstname', text, true)}
      />
      {errors.firstname && <Text>This is required.</Text>}

      <Text style={styles.label}>Last Name</Text>
      <TextInput
        style = {styles.input}
        onChangeText = {text => setValue('lastname', text, true)}
      />
      {errors.lastname && <Text>This is required.</Text>}

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

    
      <Button title="Sign Up" onPress={onSignUp} styles={{marginBottom: 20}} />
      <Text></Text>
      <Button title="Back" onPress={() => props.navigation.goBack()} />
      
      
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

export default SignUpForm;
