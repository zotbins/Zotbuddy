import React, { useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'

const LoginForm = ({ navigation }) => {
  const { register, setValue, handleSubmit, errors } = useForm()

  //TODO: Create onSubmit function...
  const onSubmit = data => console.log('submitted: ', data)
  
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
        <Button color="white" title="Button" onPress={handleSubmit(onSubmit)} />
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

export default LoginForm
