import React, {useState} from 'react'
import { Text, View, StyleSheet, TextInput, Button } from 'react-native'
import * as firebase from 'firebase'
import 'firebase/firestore'

const ResetPassword = props => {
    const [text1, onChangeText1] = useState("");
    const [text2, onChangeText2] = useState("");

    const newPassword = async (_) => {
        const user = firebase.auth().currentUser;
        if(text1 == text2){
            try {
                await user.updatePassword(text1)
                console.log('Password Updated!')
            } catch (err) {
                console.log(err)
            }
        }
    }

    const backToProfile = () => {
        props.navigation.goBack()
    }
    
    return(
        <View>
            <TextInput
            onChangeText={onChangeText1}
            placeholder="Enter new password"
            value = {text1}
            />
            <TextInput
            onChangeText={onChangeText2}
            placeholder="Re enter new password"
            value = {text2}
            />
            <Button
            title="Submit"
            onPress= {newPassword}
            />
            <Button
            title="Back"
            onPress= {backToProfile}
            />
        </View>
    );
}

export default ResetPassword;