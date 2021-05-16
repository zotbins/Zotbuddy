import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Image } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
import zotBinsLogo from '../../assets/images/ZotBins_Icon.png'
import { Icon, Button } from 'native-base'


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
      <Button iconLeft large transparent onPress={backToLogin} style={styles.arrowButton}>
        <Icon name='arrow-back' color='#3b5998' style={styles.backArrow}/>
      </Button>
      <Image style={styles.zotBinsLogo} source={zotBinsLogo}/>
      <Text style={styles.label1}>Forgot Password?</Text>

      <Text style={styles.label2}>No worries! Enter the email associated with your account to reset your password.</Text>

      <Text style={styles.label3}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setValue('email', text, true)}
      />
      {errors.email && <Text>This is required.</Text>}

      <Text style={styles.label}> </Text>

      <Button rounded onPress={passwordReset} style={styles.button}>
         <Text style={styles.label4}>Send</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  label1: {
    color: '#000000',
    fontSize: 24,
    marginTop: 70,
    alignSelf: 'center'
  },
  label2: {
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'center'
  },
  label3: {
    color: '#000000',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontSize: 16,
    marginLeft: 32
  },
  label4: {
    color: '#000000',
    fontSize: 16,
  },
  button :{
    marginTop: 20,
    alignSelf: 'center',
    width: 126,
    height: 34,
    color: 'black',
    backgroundColor: '#C4C4C4',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    width: '100%',
    backgroundColor: 'white'
  },
  input: {
    backgroundColor: '#F3F3F3',
    color: '#4F4F4F',
    height: 40,
    marginLeft: 28,
    marginRight: 27,
    padding: 10,
    borderRadius: 4,
  },
  zotBinsLogo: {
      height: 157,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop: 40,
      marginLeft: 20
  },
  backArrow: {
      width: 145,
      fontSize: 50,
      color: 'black',
  },
  arrowButton: {
      width: '20%',
  }
})

export default ForgotPasswordForm;
