
import React from 'react';
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native';

export default function Input(props){

    if (props.value == ""){
        var eT = "Required"
    }
    return(
        <React.Fragment>
        <View style={styles.loginBox}>
        <TextInput
            {...props}
            />
        
        </View>
        {eT && (
            <View style={styles.errorBox}>
            <Text style={[styles.errorText]}>*{eT}</Text>
            </View>
        )}
        {!eT && (
            <Text style={[styles.errorText]}>{eT}</Text>
        )}
        
    
    </React.Fragment>
    );

}
const styles = StyleSheet.create({
    errorBox: {
        backgroundColor: 'white',
        flexShrink: 0,
        flexDirection: 'column',
        alignItems: 'center',
        width: '92%',
        paddingBottom: 0
 

    },

    loginBox: {
        backgroundColor: 'white',

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
        padding: 1,
        paddingLeft: 20,
        flexShrink: 3,
        flexDirection: 'column',
        color: '#fa4646'
    }
})