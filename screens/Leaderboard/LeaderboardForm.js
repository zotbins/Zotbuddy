import React, {useEffect} from 'react'
import { Text, View, StyleSheet, TextInput, Button, FlatList, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LeaderboardForm = props => {
    const navigation = useNavigation()
    let arr = props.blood
    
    const backPage = () => {
        navigation.goBack()
    }
    return(
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.pageTitle}>Leaderboard</Text>
            <FlatList
                data = {arr}
                renderItem = {({item}) =>
                    <View style = {styles.item}>
                        <Text style = {styles.itemTitle}>Name: {item.firstname}</Text>
                        <Text style = {styles.font}>Rank: {item.key}</Text>
                        <Text style = {styles.font}>Points: {item.points}</Text>   
                    </View>
                    
                }
                keyExtractor = {item => item.key.toString()}
            />
            <Button
                title="Back"
                onPress={backPage}
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

export default LeaderboardForm;