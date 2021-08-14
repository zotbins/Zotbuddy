
import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

export default function Input(props){
    console.log("styles is ", props.otherStyles.loginBox)
    if (props.value == ""){
        var eT = "Required"
        console.log("OOpsies")
    }else{
        console.log(props.value)
    }
    return(
        <View style={styles.loginBox}>
        <TextInput
            {...props}
            />
        {eT && (
            <Text style={[props.otherStyles.errorText]}>*{eT}</Text>
        )}
    </View>
    );

}
const styles = StyleSheet.create({

    loginBox: {
        backgroundColor: 'white',
        flexShrink: 3,
        flexDirection: 'column',
        alignItems: 'center',
        width: '92%',
      },
    input: {
        width: '95%',
        borderWidth: 1,
        height: 40,
        padding: 10,
        borderRadius: 5,
      },
    errorText: {
        alignSelf: 'flex-start',
        padding: 7,
        flexDirection: 'column',
        color: '#fa4646'
    }
})