import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'


const ForgotPasswordForm =  props  => {
  const { register, setValue, getValues, errors } = useForm()


  const passwordReset = (e) => {
    firebase.auth().sendPasswordResetEmail(getValues("email"))
  }

  const backToLogin = () => {
    console.log(props)
    props.navigation.goBack()
  }
  useEffect(() => {
    register({ name: 'email'}, { required: true })
  }, [register])

  console.log(errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('email', text, true)}
      />
      {errors.email && <Text>This is required.</Text>}

      <Text style={styles.label}> </Text>

      <Button title="Forgot Password" onPress={passwordReset} style = {styles.button}/>

      <Text style={styles.label}> </Text>

      <Button title="Back" onPress={backToLogin} style = {styles.button}/>


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

export default ForgotPasswordForm;
