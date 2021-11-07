import React, {useState, useEffect} from 'react'
import { Text, View, StyleSheet, Pressable, FlatList, SafeAreaView, Image, TouchableHighlight, Modal,} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";

import { BlurView } from 'expo-blur'

{/* Iphone figma Width: 375, Height: 812 */}

const LeaderboardForm = props => {
    const navigation = useNavigation()
    let arr = props.blood
    let currentEmail = props.email
    let currentObj;
    const sortTitles = ["Sort By:", "Rank: Highest", "Rank: Lowest", "Name: A-Z", "Name: Z-A"]
    
    const getCurrentObj = () => {
        let userObj
        for (const obj of arr) {
            if (obj.email === currentEmail) {
                return obj
            }
        }
    }
    currentObj = getCurrentObj()

    const [modalVisible, setModalVisible] = useState(false);

    const backPage = () => {
        navigation.goBack()
    }
    return(
        <SafeAreaView style = {styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Sort By:</Text>
                        <Text style={{...styles.modalText, color: "#4B83D7"}}>Rank: Highest</Text>
                        <Text style={{...styles.modalText, color: "#4B83D7"}}>Rank: Lowest</Text>
                        <Text style={{...styles.modalText, color: "#4B83D7"}}>Name: A-Z</Text>
                        <Text style={{...styles.modalText, color: "#4B83D7"}}>Name: Z-A</Text>
                    </View>
                    
                    <View style={{alignItems: "center", paddingTop: responsiveHeight(0.74)}}>
                        <Pressable
                            underlayColor="transparent"
                            style={styles.button}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={{...styles.modalText, bottom: 15}}>Cancel</Text>
                        </Pressable>
                    </View>

                </View>
            </Modal>

            <View style={styles.flatListContainer}>
                <FlatList
                    ListHeaderComponent={
                    <>
                        <TouchableHighlight underlayColor="transparent" onPress={backPage}>
                            <Image
                                source={require('../../assets/images/back_arrow.png')}
                            />
                        </TouchableHighlight>

                        <Text style = {styles.pageTitle}>Leaderboard</Text>

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

                        <View style={styles.sortContainer}>
                            <TouchableHighlight underlayColor="transparent" onPress={() => setModalVisible(true)}>
                                <Text style = {styles.sortTitle}>Sort</Text>
                            </TouchableHighlight>
                        </View>

                        <Text style = {styles.rankingTitle}>All Rankings</Text>
                    </>
                    }
                    data = {arr.slice(0,10)}
                    renderItem = {({item}) =>
                        <View style = {{width: responsiveWidth(89.3),
                                        borderTopLeftRadius: item.key == 1 ? 15 : 0,
                                        borderTopRightRadius: item.key == 1 ? 15 : 0,
                                        borderBottomLeftRadius: item.key == 10 ? 15 : 0,
                                        borderBottomRightRadius: item.key == 10 ? 15 : 0,
                                        backgroundColor: item.email === currentEmail ? "#FFEB8F" : (item.key % 2 === 0 ? "#E4E0DB" : "#FFFFFF")}}>
                            <Text style = {{...styles.font, ...styles.nameText}}>{item.firstname}</Text>
                            <Text style = {{...styles.font, ...styles.rankText}}>Rank {item.key}</Text>
                            <Text style = {{...styles.font, ...styles.pointsText}}>{item.points} Points</Text>   
                        </View>
                    }
                    keyExtractor = {item => item.key.toString()}
                />
            </View>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        top: responsiveHeight(54)
    },

    modalView: {
        marginHorizontal: responsiveWidth(14.13),
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
        height: responsiveHeight(36.21),
        elevation: 5,
        paddingTop: 5
    },

    button: {
        borderRadius: 15,
        paddingTop: 10,
        elevation: 5,
        backgroundColor: "white",
        width: responsiveWidth(71.73)
    },
    textStyle: {
        color: "#4B83D7",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginTop: 16,
        textAlign: "center",
        fontWeight: "bold", 
        fontSize: 20,
        color: 'black'
    },
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
        paddingTop: 48,
        paddingHorizontal: 20,

    },

    flatListContainer: {
        alignItems: 'center', 
        marginBottom: 36,
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
        marginBottom: 17, 
        marginTop: 11
    },

    nameText: {
        fontSize: responsiveFontSize(2.06), 
        left: responsiveWidth(5.87), 
        top: 12
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

export default LeaderboardForm;