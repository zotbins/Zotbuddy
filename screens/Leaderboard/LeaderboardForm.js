import React, {useState, useEffect} from 'react'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { Text, View, StyleSheet, Pressable, FlatList, SafeAreaView, Image, TouchableHighlight, Modal, Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import LeaderboardHome from "./LeaderboardHome"
import { BlurView } from 'expo-blur'

{/* Iphone figma Width: 375, Height: 812 */}

const LeaderboardForm = props => {
    const navigation = useNavigation()
    let currentObj;

    //================ FROM LeaderboardPage.js ===============================
    let page = props.page
    const [arr, setArr] = useState([])
    
    const auth = firebase.auth()
    const currentEmail =  auth.currentUser?.email

    // sorter1 and sorter2 determine how the leaderboard is sorted
    // default is sort by rank descending
    const [sorter1, setSorter1] = useState("points")
    const [sorter2, setSorter2] = useState("desc")

    // Problem: key is based on the position that object is in the firebase document. Thus,
    // it is not a good indicator of a user's rank (rank should be based on one's # of points)
    const getLeaderboard = async () => {
      let arr = []
      const db = firebase.firestore()
      const query = db.collection("users").orderBy(sorter1, sorter2)
      await query.get().then((querySnapshot) => {
          querySnapshot.forEach((userDoc) => {
              arr.push({...userDoc.data(), key: arr.length + 1})
          })
      })
      console.log(arr)
      setArr(arr)
    }

    useEffect(() => {
       async function cover(){
          getLeaderboard()
       }
       cover()
      }, [sorter1, sorter2])

    //=====================================================================

    // Get the object containing the ranking details of the current app user
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
    
    // States to set the text boldness of each sorter in the modal
    // if a sorter is selected, then the text corresponding to that sorter
    // (ie. "Rank: Highest"/"Rank: Lowest") is bolded
    // sorters not selected have a fontWeight of normal
    const [rankDesc, setRankDesc] = useState(true); // rank Descending is the default sorter
    const [rankAsc, setRankAsc] = useState(false);
    const [alphabDesc, setAlphabDesc] = useState(false);
    const [alphabAsc, setAlphabAsc] = useState(false);

    const backPage = () => {
        navigation.goBack()
    }

    // Upon clicking a new sorting mechanism for the leaderboard, two things must change:
    // (1) The boldness of the sorters: the sorter selected must be bolded while the remaining
    //     three should be unbolded
    // (2) The leaderboard should display a new combination of users based upon the sorter selected
    const updateLeaderboard = (newSorter1, newSorter2, sorterSpecifier) =>
    {
        // update way of sorting leaderboard
        setSorter1(newSorter1)
        setSorter2(newSorter2)
        
        // update boldness of sorters
        if (sorterSpecifier == "rankDesc") {
            setRankDesc(true)
            setRankAsc(false)
            setAlphabDesc(false)
            setAlphabAsc(false)
        }
        else if (sorterSpecifier == "rankAsc"){
            setRankDesc(false)
            setRankAsc(true)
            setAlphabDesc(false)
            setAlphabAsc(false)
        }
        else if (sorterSpecifier == "alphabDesc"){
            setRankDesc(false)
            setRankAsc(false)
            setAlphabDesc(true)
            setAlphabAsc(false)
        }
        else {
            setRankDesc(false)
            setRankAsc(false)
            setAlphabDesc(false)
            setAlphabAsc(true)
        }
    }

    if (arr.length == 0) {
        return<></>   
    }
    else {
        if (page == "home"){
            return (
                <LeaderboardHome blood = {arr} email = {currentEmail}/>
              )
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

                            <View style={styles.sortBy}>
                                <Text style={styles.modalText}>Sort By:</Text>
                                <Image
                                        style={{top: responsiveHeight(1.7)}}
                                        source={require('../../assets/images/arr_separator.png')}
                                />
                            </View>

                            <View style={styles.sorters}>
                                <TouchableHighlight underlayColor="transparent" onPress = {() => updateLeaderboard("points", "desc", "rankDesc")}>
                                    <Text style={{...styles.modalText, color: "#4B83D7", fontWeight: rankDesc ? "bold" : "normal"}}>
                                        Rank: Highest
                                    </Text>
                                </TouchableHighlight>
                                <Image
                                        style={{top: responsiveHeight(1.7)}}
                                        source={require('../../assets/images/arr_separator.png')}
                                />
                            </View>

                            <View style={styles.sorters}>
                                {/* CHANGE HARDCODED FONT WEIGHTS */}
                                <TouchableHighlight underlayColor="transparent" onPress = {() => updateLeaderboard("points", "asc", "rankAsc")}>
                                    <Text style={{...styles.modalText, color: "#4B83D7",fontWeight: rankAsc ? "bold" : "normal"}}>
                                        Rank: Lowest
                                    </Text>
                                </TouchableHighlight>
                                <Image
                                        style={{top: responsiveHeight(1.7)}}
                                        source={require('../../assets/images/arr_separator.png')}
                                />
                            </View>

                            <View style={styles.sorters}>
                                <TouchableHighlight underlayColor="transparent" onPress = {() => updateLeaderboard("firstname", "asc", "alphabAsc")}>
                                    <Text style={{...styles.modalText, color: "#4B83D7", fontWeight: alphabAsc ? "bold" : "normal"}}>
                                        Name: A-Z
                                    </Text>
                                </TouchableHighlight>
                                <Image
                                        style={{top: responsiveHeight(1.7)}}
                                        source={require('../../assets/images/arr_separator.png')}
                                />
                            </View>

                            <View style={styles.sorters}>
                                <TouchableHighlight underlayColor="transparent" onPress = {() => updateLeaderboard("firstname", "desc", "alphabDesc")}>
                                    <Text style={{...styles.modalText,  color: "#4B83D7", fontWeight: alphabDesc ? "bold" : "normal"}}>
                                        Name: Z-A
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                        
                        <View style={{alignItems: "center", paddingTop: responsiveHeight(0.74)}}>
                            <Pressable
                                underlayColor="transparent"
                                style={styles.button}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <View style={styles.cancelText}>
                                    <Text style={{...styles.modalText, fontWeight: "normal", color: "#4B83D7"}}>
                                        Cancel
                                    </Text>
                                </View>
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
}

const styles = StyleSheet.create({
    centeredView: {
        top: responsiveHeight(53.5)
    },

    modalView: {
        marginHorizontal: responsiveWidth(14.13),
        backgroundColor: "white",
        borderRadius: 15,
        alignItems: "center",
        height: responsiveHeight(36.21),
        elevation: 5,
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
        textAlign: "center",
        fontWeight: "bold", 
        fontSize: responsiveFontSize(2.46),
        color: 'black'
    },
    sortBy: {
        marginTop: Platform.OS == "ios" ? responsiveHeight(2.5) : responsiveHeight(1.3),
    },
    sorters: {
        marginTop: Platform.OS == "ios" ? responsiveHeight(4.1) : responsiveHeight(2.9),
    },
    cancelText: {
        marginTop: Platform.OS == "ios" ? responsiveHeight(3.55) : responsiveHeight(2.4),
        bottom: responsiveHeight(2.2)
    },
    container: {
        flex: 1,
        backgroundColor: "#F4F4F4",
        paddingTop: 48,
        paddingHorizontal: 20,

    },
    flatListContainer: {
        alignItems: 'center', 
        marginBottom: responsiveHeight(3), 
    },

    pageTitle: {
        fontFamily: "Arial",
        fontSize: 20,
        lineHeight: 23,
        marginBottom: responsiveHeight(5),
        fontWeight: "bold",
        color: "#0064A4",
        top: responsiveHeight(4),
    },

    youContainer: {
        backgroundColor:'#FFEB8F', 
        borderRadius: 15, 
        marginBottom: responsiveHeight(2.09), 
    },

    nameText: {
        fontSize: responsiveFontSize(2.06), 
        left: responsiveWidth(5.87), 
        top: responsiveHeight(1.48)
    },

    rankText: {
        fontSize: responsiveFontSize(2.06),
        left: responsiveWidth(71.2),
    },

    pointsText: {
        fontSize: responsiveFontSize(1.51), 
        left: responsiveWidth(5.87), 
        top: -responsiveHeight(1.35)
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