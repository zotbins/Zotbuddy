import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Image } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import * as firebase from 'firebase'
import 'firebase/firestore'
//import zotBinsLogo from '../../assets/images/ZotBins_Icon.png'
import zotZeroLogo from '../../assets/images/Logo-ZotZero-Horizontal-02.svg'
import { Icon, Button, Card, CardItem } from 'native-base'


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
        <Icon name='arrow-back' onPress={backToLogin} style={styles.backArrow}/>
      </Button>
      <Text style={styles.label1}>Forgot Password?</Text>

      <Card style={styles.card}>
          <Text style={styles.label2}>No worries! Enter your registered email below to reset your password.</Text>

          <Text style={styles.label3}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setValue('email', text, true)}
          />
          {errors.email && <Text>This is required.</Text>}

          <Text style={styles.label}> </Text>

          <Button rounded onPress={passwordReset} style={styles.button}>
             <Text style={styles.label4}>Send Email</Text>
          </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  label1: {
    color: '#0064A4',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 125,
    marginBottom: 15,
    alignSelf: 'center'
  },
  label2: {
    color: '#6AA2B8',
    marginTop: 20,
    marginLeft: 25,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 16,
    alignSelf: 'center',
    textAlign: 'left'
  },
  label3: {
    color: '#555759',
    marginTop: 20,
    marginRight: 20,
    fontSize: 14,
    marginLeft: 25
  },
  label4: {
    color: 'white',
    fontSize: 16,
  },
  button :{
    marginTop: 20,
    alignSelf: 'center',
    width: '65%',
    height: 38,
    marginBottom: 25,
    backgroundColor: '#0064A4',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    padding: 15,
    width: '100%',
    backgroundColor: '#F4F4F4'
  },
  input: {
    //backgroundColor: '#F3F3F3',
    color: '#4F4F4F',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 4,
    borderColor: '#555759',
    borderWidth: 1
  },
  backArrow: {
      width: 145,
      fontSize: 40,
      color: '#0064A4',
      marginLeft: 2
  },
  arrowButton: {
      width: '10%',
  },
  card: {
    marginLeft: 10,
    marginRight: 10
  }
})

export default ForgotPasswordForm;
