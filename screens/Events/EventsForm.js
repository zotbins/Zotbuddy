import React, {useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, Button, FlatList, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'

import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'
import * as Font from 'expo-font';


const EventsForm = props => {
    let arr = props.blood
    useEffect(() => {
        (async () => await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        }))();
        }, [])

    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.pageTitle}>Events</Text>
            <FlatList
                data = {arr}
                renderItem = {({item}) =>
                    <View style = {styles.item}>
                        <Text style = {styles.itemTitle}>{item.title}</Text>
                        <Text style = {styles.dateFont}>{item.startDate.toString().substring(0, item.startDate.toString().length - 15)} - {item.endDate.toString().substring(0, item.endDate.toString().length - 15)}</Text>
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
        padding: 10,
        backgroundColor: "#EAEAEA",
        borderRadius: 10
    },
   
    pageTitle: {
        fontFamily: "Roboto",
        fontSize: 30,
        marginBottom: 30,
        fontWeight: "bold"
    },

    itemTitle: {
        fontFamily: "Roboto",
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 4
    },

    font: {
        fontFamily: "Roboto",
        fontSize: 15,
        lineHeight: 20
    },

    dateFont: {
        fontFamily: "Roboto",
        fontSize: 14,
        marginBottom: 15
    }


})

export default EventsForm;