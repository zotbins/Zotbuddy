import React, {useState} from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableHighlight, Image,
        TouchableOpacity } from 'react-native'
// import * as firebase from 'firebase'
// import 'firebase/firestore'
import { firebaseDb, firebaseAuth } from "../../firebaseConfig"
import Constants from 'expo-constants'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import BackButton from '../../components/BackButton'

const ResetPassword = props => {
    const [currentPassword, onChangeCurrentPassword] = useState("")
    const [text1, onChangeText1] = useState("");
    const [text2, onChangeText2] = useState("");

    const reauthenticate = () => {
        // Before changing a password (a sensitive task that requires the user recently logging in), we must 
        // reauthenticate the user's account with their email + password to avoid them having to log out and sign back in
        // source: https://medium.com/@ericmorgan1/change-user-email-password-in-firebase-and-react-native-d0abc8d21618  
        const user = firebaseAuth.currentUser;
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword)
        return user.reauthenticateWithCredential(cred)
    }
    const changePassword = async () => {
        reauthenticate().then( () => {
            const user = firebaseAuth.currentUser;
            if (text1 == text2)
            {
                user.updatePassword(text1).then(() => {
                    console.log("Password updated!");
                }).catch((error) => { console.log(error) });
            } 
            else 
            { 
                alert("Please Match the Passwords"); 
            }
        }).catch((error) => { console.log(error); });

    }

    const backToProfile = () => {
        props.navigation.goBack()
    }
    
    return(
        <View style={styles.container}>
            <View style={{marginLeft: 0}}>
                <BackButton/>
            </View>
            <View style={{alignItems: "center"}}>
                <Image 
                style={{height:responsiveHeight(10)}}
                source={require("../../assets/images/Zotbins_logo_transparent.png")}
                resizeMode='contain'
                />
                <View style={{paddingTop: responsiveHeight(2), paddingBottom: responsiveHeight(5)}}>
                    <Text style={styles.header}>
                        Forgot Password?
                    </Text>
                </View>

                <View style={{paddingBottom: responsiveHeight(0.2)}}>
                    <Text style={{fontWeight: '600', fontSize: 15}}>
                        Current Password
                    </Text>
                    <TextInput
                    onChangeText={onChangeCurrentPassword}
                    placeholder=""
                    textAlign='center'
                    value = {currentPassword}
                    secureTextEntry = {true}
                    />
                </View>

                <View style={styles.grayBorder}/>

                <View style={{paddingTop: responsiveHeight(3), paddingBottom: responsiveHeight(0.2)}}>
                    <Text style={{fontWeight: '600', fontSize: 15}}>
                        New Password
                    </Text>
                    <TextInput
                    onChangeText={onChangeText1}
                    placeholder=""
                    textAlign='center'
                    value = {text1}
                    secureTextEntry = {true}
                    />
                </View>

                <View style={styles.grayBorder}/>

                <View style={{paddingTop: responsiveHeight(3), paddingBottom: responsiveHeight(0.2)}}>
                    <Text style={{fontWeight: '600', fontSize: 15}}>
                        Re-enter New Password
                    </Text>
                    <TextInput
                    onChangeText={onChangeText2}
                    placeholder=""
                    textAlign='center'
                    value = {text2}
                    secureTextEntry = {true}
                    />
                </View>

                <View style={styles.grayBorder}/>

                <View style={{paddingTop: responsiveHeight(5)}}>
                    <TouchableOpacity style={styles.button} onPress={changePassword}>
                        <Text style={{color: 'white', fontWeight: '700'}}>Reset Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: Constants.statusBarHeight,
        padding: 8,
        width: '100%',
        backgroundColor: '#F4F4F4',
      },
    header: {
        fontSize: 30,
        fontWeight: '700',
        color: '#0064A4',
    },
    button :{
        alignItems: 'center',
        backgroundColor: '#0064A4',
        borderRadius: 20,
        padding: 10,
        width: responsiveWidth(50)
      },
      grayBorder: {
        borderBottomColor: '#CCCCCC',
        borderBottomWidth: 1,
        width: "50%",
      },
})
export default ResetPassword;