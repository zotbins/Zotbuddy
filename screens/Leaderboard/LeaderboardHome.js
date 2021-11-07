import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
  
{/* Iphone figma Width: 375, Height: 812 */}

const LeaderboardHome = props => {
    const navigation = useNavigation()
    let arr = props.blood
    let currentEmail = props.email
    let currentObj;

    const getCurrentObj = () => {
        let userObj
        for (const obj of arr) {
            if (obj.email === currentEmail) {
                return obj
            }
        }
    }
    currentObj = getCurrentObj()

    console.log("OBJECT",currentObj)

    return(
        <SafeAreaView style = {styles.container}>
                <View style={styles.youContainer}>
                    <Text style = {{...styles.font, ...styles.nameText, fontWeight: 'bold'}}
                        >You
                    </Text>
                    <Text style = {{...styles.font, ...styles.rankText}}>
                        Rank {currentObj.key}
                    </Text>
                    <Text style = {{...styles.font, ...styles.pointsText}}>
                        {currentObj.points} Points
                    </Text>
                </View>

                <FlatList
                    data = {arr.slice(0,3)}
                    renderItem = {({item}) =>
                        <View style = {{width: responsiveWidth(89.3),
                                        borderTopLeftRadius: item.key == 1 ? 15 : 0,
                                        borderTopRightRadius: item.key == 1 ? 15 : 0,
                                        borderBottomLeftRadius: item.key == 3 ? 15 : 0,
                                        borderBottomRightRadius: item.key == 3 ? 15 : 0,
                                        backgroundColor:"#FFFFFF", marginBottom: item.key != 3 ? 2 : 0}}>
                            <Text style = {{...styles.font, ...styles.nameText}}>{item.firstname}</Text>
                            <Text style = {{...styles.font, ...styles.rankText}}>Rank {item.key}</Text>
                            <Text style = {{...styles.font, ...styles.pointsText}}>{item.points} Points</Text>
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
    },

    flatListContainer: {
        alignItems: 'center', 
    },

    pageTitle: {
        fontFamily: "Arial",
        fontSize: 20,
        lineHeight: 23,
        marginBottom: 30,
        fontWeight: "bold",
        color: "#0064A4",
        top: responsiveHeight(4),
    },

    youContainer: {
        backgroundColor:'#FFEB8F', 
        borderRadius: 15, 
        marginBottom: 7, 
        marginTop: 3
    },

    nameText: {
        fontSize: responsiveFontSize(2.06), 
        left: responsiveWidth(5.87), 
        top: 12,
    },

    rankText: {
        fontSize: responsiveFontSize(2.06),
        left: responsiveWidth(71.2)
    },

    pointsText: {
        fontSize: responsiveFontSize(1.51), 
        left: responsiveWidth(5.87), 
        top: -11
    },
    
    sortContainer: {
        marginBottom: 10, 
        left: responsiveWidth(80)
    },

    sortTitle: {
        fontFamily: "Arial",
        fontSize: 14,
        lineHeight: 16,
        color: "#0064A4"
    },

    rankingTitle: {
        fontFamily: "Arial",
        fontSize: 16,
        marginBottom: 11,
        fontWeight: "bold",
        color: "#555759",
    },

    font: {
        fontFamily: "Roboto",
        marginBottom: 4,
        color: "#555759"
    },
})

export default LeaderboardHome;