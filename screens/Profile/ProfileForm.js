import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { storeItem } from '../../util'
import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'


const ProfileForm =  props  => {
  const { register, setValue, getValues, errors } = useForm()
  const navigation = useNavigation()

  const onLinkToGoogle = async (_) => {
    //todo
    console.log('link acc with google')
  }

  const onLinkToFacebook = async (_) => {
    //todo
    console.log('link acc with facebook')
  }

  const onSubmit = async (_) => {
    //todo
    console.log('update form with firebase')
  }

  const onReset = async (_) => {
    //todo
    console.log('reset form')
  }
  
  useEffect(() => {
    register({ name: 'name'})
  }, [register])

  console.log(errors)

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('name', text, true)}
      />

      <View style={styles.button}>
        <Button title="Submit" onPress={onSubmit} />
        <Button title="Reset" onPress={onReset} />
        {/**
         * TODO:
         * check if account is linked
         * if not linked, display approriate button
         * 
         * onPress => link with fb or gmail
         */}
        <Button title="Link with Facebook" />
        <Button title="Link with Gmail" />
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

export default ProfileForm;
