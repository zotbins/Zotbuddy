import React, {useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity} from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'



const ProfileForm =  props  => {
  //const { register, setValue, getValues, reset, errors } = useForm()
  const navigation = useNavigation()

  const onSubmit = async (_) => {
    //todo
    navigation.navigate("Leaderboard")
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
      <Text style={styles.title}>{props.blood.firstname} {props.blood.lastname}</Text>
      <Text style={styles.points}>{props.blood.points} Points</Text>

      <View style={styles.grayBorder}/>

        
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Full Name</Text>
        <Text style={styles.infoName}>{props.blood.firstname} {props.blood.lastname}</Text>
        
        <Text style={styles.infoTitle}>Email</Text>
        <Text style={styles.info}>{props.blood.email}</Text>
      </View>

      <View style={styles.grayBorder}/>

      <View style={styles.button}>
        <TouchableOpacity style={styles.profileButton} onPress={onSubmit}>
          <Text style={styles.profileButtonText}>Submit</Text>
          <Text style={styles.profileButtonEnd}>></Text>  
        </TouchableOpacity>
        <TouchableOpacity style={styles.lastProfileButton} onPress={onReset}>
          <Text style={styles.profileButtonText}>Reset</Text>
          <Text style={styles.profileButtonEnd}>></Text>  
        </TouchableOpacity>
        {/**
         * TODO:
         * check if account is linked
         * if not linked, display approriate button
         * 
         * onPress => link with fb or gmail
         */}
        
      </View>
      

      <View style={styles.grayBorder}/>
      <Text style={{alignSelf: 'center', justifyContent: 'flex-end', fontWeight: 'bold', fontSize: 18}}>Log Out</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  profileButtonText: {
    fontSize: 16,
    marginLeft: 10
  },
  profileButtonEnd: {
    fontSize: 26,
    alignSelf: 'flex-end',
    marginRight: 3,
  },
  lastProfileButton: {
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 3,
    shadowColor: 'black',
    shadowOpacity: .25,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 3,
    width: "80%",
  },
  profileButton: {
    marginBottom: 12,
    alignItems: 'center',
    justifyContent:'space-between',
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 3,
    shadowColor: 'black',
    shadowOpacity: .25,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 15,
    elevation: 3,
    width: "80%",
  },
  infoBox: {
    marginLeft: 30
  },
  grayBorder: {
    borderBottomColor: '#CCCCCC',
          borderBottomWidth: 1,
          width: "85%",
          margin: 20,
          alignSelf: 'center'
  },
  title: {
    fontSize: 26,
    color: 'black',
    alignSelf: 'center',
  },
  points: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  infoTitle: {
    color: 'black',
    fontSize: 16,
    margin: 5,
    marginBottom: 1
  },
  infoName: {
    color: '#4F4F4F',
    margin: 5,
    marginBottom: 15,
    fontSize: 16
  },
  info: {
    color: '#4F4F4F',
    margin: 5,
    fontSize: 16
  },
  button :{
    alignItems: 'center',
    color: 'white',
    borderRadius: 4,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    width: '100%',
    backgroundColor: '#F4F4F4'
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 4,
  }
})

export default ProfileForm;
