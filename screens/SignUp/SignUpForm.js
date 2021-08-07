import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import Input from "../../components/Input";

const SignUpForm =  props  => {
  const { control, setValue, getValues, errors } = useForm()
  const [err, setErr] = useState(null)

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
  


  console.log(errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name</Text>
      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="firstname"
                style={[styles.input, { borderColor: 'black' }]}
                value={value}
                placeholder = "First Name"
                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('firstname', text, true)}}
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
      {/* <TextInput
        style = {styles.input}
        onChangeText = {text => setValue('firstname', text, true)}
      />
      {errors.firstname && <Text>This is required.</Text>} */}

      <Text style={styles.label}>Last Name</Text>

      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="lastname"
                style={[styles.input, { borderColor: 'black' }]}
                value={value}
                placeholder = "Last Name"
                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('lastname', text, true)}}
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
      {/* <TextInput
        style = {styles.input}
        onChangeText = {text => setValue('lastname', text, true)}
      />
      {errors.lastname && <Text>This is required.</Text>} */}

      <Text style={styles.label}>Email</Text>

      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="email"
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
      {/* <TextInput
        style={styles.input}
        onChangeText={text => setValue('email', text, true)}
      />
      {errors.email && <Text>This is required.</Text>} */}

      <Text style={styles.label}>Password</Text>

      <Controller
            defaultValue=""
            control={control}
            render={({onChange, onBlur, value}) => (
            
              <Input
                name="password"
                style={[styles.input, { borderColor: 'black' }]}
                secureTextEntry={true}
                value={value}
                placeholder = "Password"

                onChangeText={(text) =>  {
                  clearLoginError()
                  setValue('password', text, true)}}
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
      {/* <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={text => setValue('password', text, true)}
      /> */}
      {err && <Text style= {styles.errorText}> {err} </Text>}


    
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
  },
  errorText: {
    alignSelf: 'flex-start',
    paddingLeft: 20,
    flexDirection: 'column',
    color: '#fa4646'
}
})

export default SignUpForm;
