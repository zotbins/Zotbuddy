import React, {useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, Button, FlatList, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'native-base'

const LeaderboardForm = props => {
    const navigation = useNavigation()
    let arr = props.blood
    const colors = ['#FFFFFF', '#E4E0DB']
    let currentUser = arr[1];
    const backPage = () => {
        navigation.goBack()
    }
    return(
        <SafeAreaView style = {styles.container}>
            <Icon name='arrow-back' onPress={backPage} style={styles.backArrow}/>
            <Text style = {styles.pageTitle}>Leaderboard</Text>
            <View style = {[styles.topItem, { backgroundColor:  '#FFEB8F' }]}>
                <View>
                    <Text style = {styles.itemTitle}>{currentUser.firstname}</Text>
                    <Text style = {styles.font}>{currentUser.points} Points</Text>   
                </View>
                <Text style = {styles.rankTitle}>Rank {currentUser.key}</Text>
            </View>

            <View style={styles.subView}>
                <Text style = {styles.subTitle}>All Rankings</Text>
                <Text style = {styles.sortTitle}>Sort</Text>
            </View>

            <View>
                <FlatList
                    data = {arr}
                    style = {styles.listView}
                    renderItem = {({item, index}) =>
                        <View style = {[styles.item, { backgroundColor: (currentUser === item ?  '#FFEB8F' : colors[index % colors.length]), 
                        borderTopLeftRadius: (index === 0 ? 15 : 0), borderTopRightRadius: (index === 0 ? 15 : 0), 
                        borderBottomLeftRadius: (index === arr.length-1 ? 15 : 0), borderBottomRightRadius: (index === arr.length-1 ? 15 : 0),}]}>
                            <View>
                                <Text style = {styles.itemTitle}>{item.firstname}</Text>
                                <Text style = {styles.font}>{item.points} Points</Text>   
                            </View>
                            <Text style = {styles.rankTitle}>Rank {item.key}</Text>
                        </View>
                    }
                    keyExtractor = {item => item.key.toString()}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: '#F4F4F4' 
    },

    topItem: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },

    item: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'space-between',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
   
    pageTitle: {
        fontFamily: "Roboto",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10,
        fontWeight: "bold",
        color: '#0064A4'
    },

    subView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        height: '10%',
        marginTop: 25,
        marginRight: 10
    },

    listView: {
        height: '64%',
        marginVertical: 30,
    },

    subTitle: {
        fontFamily: "Roboto",
        fontSize: 16,
        fontWeight: "bold",
        color: '#555759'
    },

    sortTitle: {
        fontSize: 14,
        color: '#0064A4',
        alignSelf: 'center',
    },

    itemTitle: {
        fontFamily: "Roboto",
        fontSize: 16,
        color: '#555759'
    },

    rankTitle: {
        fontFamily: "Roboto",
        fontSize: 16,
        marginBottom: 1,
        color: '#555759',
        alignSelf: 'center'
    },

    font: {
        fontFamily: "Roboto",
        fontSize: 13,
        lineHeight: 20,
        color: '#555759'
    },

    dateFont: {
        fontFamily: "Roboto",
        fontSize: 14,
        marginBottom: 15
    },

    backArrow: {
        width: 145,
        fontSize: 40,
        color: '#0064A4',
        marginLeft: 2
    },
})

export default LeaderboardForm;