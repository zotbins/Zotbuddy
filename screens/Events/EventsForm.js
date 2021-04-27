import React, {useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, Button, FlatList, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'

import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const EventsForm = props => {
    let arr = props.blood
    

    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.title}>Events</Text>
            <FlatList
                data = {arr}
                renderItem = {({item}) =>
                    <View style = {styles.item}>
                        <Text style = {styles.title}>{item.title}</Text>
                        <Text style = {styles.font}>{item.description}</Text>

                    </View>
                    
                }
                keyExtractor = {item => item.key.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
        paddingHorizontal: 20
    },

    item: {
        marginTop: 24,
        padding: 30,
        backgroundColor: "pink",
    },
   
    title: {
        textAlign: "center",
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },

    font: {
        fontSize: 24
    }


})

export default EventsForm;