import React from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'



const ProfileForm =  props  => {
  //const { register, setValue, getValues, reset, errors } = useForm()
  const navigation = useNavigation()

  const onSubmit = async (_) => {
    //todo
    console.log('update form with firebase')
  }

  const onReset = () => {
    navigation.navigate("ResetPassword")
  }

  /*const displayData = async (_) => {
    const dbh = firebase.firestore()
    let userId = await SecureStore.getItemAsync('uid');
    let doc =  dbh.collection("users").doc(userId).get()

    if (!doc.exists){
      alert("No user data found!")
    }
    else{
      let dataObj = doc.data()
      setValue("firstname", dataObj.firstname, true)
      setValue("lastname", dataObj.lastname, true)
      setValue("email", dataObj.email, true)
      setValue("points", dataObj.points, true)}

    }
  
  
  useEffect(() => {
    register({name: 'firstname'}, {required: true})
    register({name: 'lastname'},{required: true})
    register({ name: 'email'}, {required: true})
    register({ name: 'points'}, {required: true})
    displayData()
  }, [register])

  console.log(errors)*/

  return (
    <View style={styles.container}>
      <Text style={styles.label}>First Name: {props.blood.firstname}</Text>
      <Text style={styles.label}>Last Name: {props.blood.lastname}</Text>
      <Text style={styles.label}>Email: {props.blood.email}</Text>
      <Text style={styles.label}>Points: {props.blood.points}</Text>
      
      <Button title="Reset" onPress={onReset} />
        {/**
         * TODO:
         * check if account is linked
         * if not linked, display approriate button
         * 
         * onPress => link with fb or gmail
         */}
        
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
