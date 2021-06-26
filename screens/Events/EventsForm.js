import React, {useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, FlatList, SafeAreaView } from 'react-native'
import { useForm } from 'react-hook-form'
import Constants from 'expo-constants'
import { Icon } from 'native-base'

import * as SecureStore from 'expo-secure-store'
import { useNavigation } from '@react-navigation/native'
import { get } from 'react-native/Libraries/Utilities/PixelRatio'

const EventsForm = props => {
    let arr = props.blood
    let todayArr = props.other 
    const navigation = useNavigation()

    const getTime = (date) => {
        var finalString = "";
        if(date % 12){
            finalString += date % 12
        }else{
            finalString += 12
        }
        return finalString;
    }

    const getAMPM = (date) => {
        var finalString = "";
        if(date >= 12){
            finalString += 'PM';
        }else{
            finalString += 'AM'
        }

        return finalString
    }

    const getTodayDateFormatted = () => {
        var today = new Date();
        var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var day = daysOfWeek[today.getDay()] + ', ' + today.toDateString().substring(4,10);
        return day;
    };

    const toDetailsPage = () => {
        navigation.navigate('EventDetailsPage');
    }

    return(
        <SafeAreaView style = {styles.container}>
            <View style={styles.subView}>
                <View>
                    <Text style = {styles.pageTitle}>Today's Events</Text>
                    <Text style = {styles.subTitle}>{getTodayDateFormatted()}</Text>
                </View>
                <Icon name='calendar' style={styles.calendarIcon}/>
            </View>
            {todayArr.length === 0 ? 
                <Text style={styles.noEventsMsg}>No events today, but look {"\n"} out for upcoming events below!</Text>
            :
                <FlatList
                    data = {todayArr}
                    style = {styles.listTodayView}
                    renderItem = {({item, index}) =>
                        <TouchableOpacity onPress={toDetailsPage} style={[styles.item, {marginTop: (index === 0 ? 0 : 12) }]}>
                            <Text style = {styles.itemDate}>{item.startDate.toString().substring(8,10)} {item.startDate.toString().substring(4,7)}</Text>
                            <View style = {styles.itemEventInfo}>
                                <Text style = {styles.itemTitle}>{item.title}</Text>
                                <Text style = {styles.dateFont}>
                                    {getTime(item.startDate.toString().substring(16,18))}:{item.startDate.toString().substring(19,21)} {getAMPM(item.startDate.toString().substring(16,18))} - {getTime(item.endDate.toString().substring(16,18))}:{item.endDate.toString().substring(19,21)} {getAMPM(item.endDate.toString().substring(16,18))} • {item.location}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor = {item => item.key.toString()}
                />
            }

            <Text style = {styles.pageTitle}>Upcoming</Text>
            {arr.length === 0 ? 
                <Text style={styles.noEventsMsg}>No upcoming events. {"\n"} Check back at another time!</Text>
            :
                <FlatList
                    data = {arr}
                    style = {styles.listView}
                    renderItem = {({item, index}) =>
                        <TouchableOpacity onPress={toDetailsPage} style={[styles.item, {marginTop: (index === 0 ? 0 : 12) }]}>
                            <Text style = {styles.itemDate}>{item.startDate.toString().substring(8,10)} {item.startDate.toString().substring(4,7)}</Text>
                            <View style = {styles.itemEventInfo}>
                                <Text style = {styles.itemTitle}>{item.title}</Text>
                                <Text style = {styles.dateFont}>
                                    {getTime(item.startDate.toString().substring(16,18))}:{item.startDate.toString().substring(19,21)} {getAMPM(item.startDate.toString().substring(16,18))} - {getTime(item.endDate.toString().substring(16,18))}:{item.endDate.toString().substring(19,21)} {getAMPM(item.endDate.toString().substring(16,18))} • {item.location}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    }
                    keyExtractor = {item => item.key.toString()}
                />
            }
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
        paddingTop: 20,
        paddingHorizontal: 20
    },

    item: {
        marginTop: 12,
        padding: 15,
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        flexDirection: 'row',
    },

    listView: {
        height: '64%',
        marginTop: 10,
        marginBottom: 12
    },
    
    listTodayView: {
        height: '34%',
        marginVertical: 10,
    },
   
    pageTitle: {
        fontFamily: "Roboto",
        fontSize: 21,
        marginTop: 10,
        fontWeight: "bold",
        color: '#0064A4'
    },

    subTitle: {
        fontFamily: "Roboto",
        fontSize: 18,
        paddingLeft: 4,
        color: '#555759'
    },

    subView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    itemEventInfo: {
        justifyContent: 'center',
        width: '80%'
    },

    itemTitle: {
        fontFamily: "Roboto",
        fontSize: 16,
        marginBottom: 2,
        fontWeight: "bold",
        color: '#555759',
    },

    itemDate: {
        fontFamily: "Roboto",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '15%',
        fontSize: 20,
        marginRight: 15,
        fontWeight: "bold",
        color: '#6AA2B8',
        textAlign: 'center'
    },

    dateFont: {
        fontFamily: "Roboto",
        fontSize: 13,
    },

    calendarIcon: {
        color: '#555759',
        paddingRight: 5
    },

    noEventsMsg: {
        height: '20%',
        fontSize: 16,
        color: '#0064A4',
        textAlign: 'center',
        paddingTop: 40,
        paddingHorizontal: 60
    }
})

export default EventsForm;