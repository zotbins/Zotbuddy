import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import { useNavigation } from '@react-navigation/native'

//TODO: make everything not hardcoded
const EventDetailsPage = (props) => {
    const navigation = useNavigation()

    const backPage = () => {
        navigation.goBack()
    }

    return (
    <View style={styles.container}>
        <View style={styles.titleView}>
            <Icon name='arrow-back' onPress={backPage} style={styles.backArrow}/>
            <Text style={styles.pageTitle}>Title of Event!</Text>
        </View>
        <TouchableOpacity style={styles.textView}>
            <View style={styles.sameLine}>
                <Text style={[styles.text, {fontWeight: "bold", marginBottom: 5}]}>Date: </Text>
                <Text style={styles.text}>Friday May 14, 2021</Text>
            </View>
            <View style={styles.sameLine}>
                <Text style={[styles.text, {fontWeight: "bold", marginBottom: 5}]}>Time: </Text>
                <Text style={styles.text}>1:00 PM - 2:00 PM</Text>
            </View>
            <View style={styles.sameLine}>
                <Text style={[styles.text, {fontWeight: "bold", marginBottom: 5}]}>Location: </Text>
                <Text style={styles.text}>Anteatery</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.textView}>
            <Text style={[styles.text, {fontWeight: "bold"}]}>Details:</Text>
            <Text style={styles.text}>Fake text fake text fake text fake text fake text fake text fake text fake text fake text fake text. {"\n\n"}fake text fake text fake text fake text fake text fake text fake text fake text fake text fake text fake text fake text fake text.</Text>
        </TouchableOpacity>
    </View>
  )
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    titleView: {
        height: '15%',
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        color: '#0064A4',
        paddingHorizontal: 20
    },
    backArrow: {
        width: 145,
        fontSize: 40,
        color: '#0064A4',
        marginLeft: 2
    },
    pageTitle: {
        fontFamily: "Roboto",
        fontSize: 20,
        marginTop: 10,
        fontWeight: "bold",
        color: '#0064A4'
    },
    textView: {
        backgroundColor: 'white',
        alignSelf: 'center',
        width: '90%',
        color: '#0064A4',
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    text: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: '#555759',
    },
    sameLine: {
        flexDirection: 'row',
    }
})

export default EventDetailsPage;