import React, {useState, useEffect} from 'react'
// import * as firebase from 'firebase'
// import 'firebase/firestore'
import { Text, View, StyleSheet, Pressable, FlatList, SafeAreaView, Image, TouchableHighlight, Modal, Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import LeaderboardHome from "./LeaderboardHome"
import { firebaseDb, firebaseAuth} from "../../firebaseConfig"
{/* Iphone figma Width: 375, Height: 812 */}


const LeaderboardForm = props => {
    const navigation = useNavigation()
    let currentObj;

    const [sorter1, setSorter1] = useState("points")
    const [sorter2, setSorter2] = useState("desc")

    //================ FROM LeaderboardPage.js ===============================
    let page = props.page
    const [arr, setArr] = useState([])
    
    const auth = firebaseAuth
    const currentEmail =  auth.currentUser?.email

    const getLeaderboard = async () => {
      let arr = []
      const db = firebaseDb
      // == FIX TO SIGN IN ERROR == 
      // previously set the arr only to have the top 10 users: now contains all the users
      const query = db.collection("users").orderBy("points", "desc")
      await query.get().then((querySnapshot) => {
          querySnapshot.forEach((userDoc) => {
              arr.push({...userDoc.data(), key: arr.length + 1})
          })
      })
      setArr(arr)
    }

    const sortLeaderboard = (s1, s2) => {
        // Clicking a sorter when its already sorted that way does not call arr.sort() again
        if (s1 === sorter1 && s2 === sorter2) { return; }

        if (s1 === "points" && s2 === "desc") {
            arr.sort(function(a,b) {return b.points - a.points});
        }
        else if (s1 === "points" && s2 === "asc") {
            arr.sort(function(a,b) {return a.points - b.points});
        }
        else if (s1 === "firstname" && s2 === "desc")
        {
            arr.sort(function(a,b) {
                var nameA = a.firstname === undefined ? a.firstname : a.firstname.toUpperCase();
                var nameB = b.firstname === undefined ? b.firstname : b.firstname.toUpperCase();
                if (nameA === undefined) { return 1; }
                if (nameB === undefined) { return -1; }

                // Order: Z-A
                // nameA - nameB < 0 ? B comes before A
                // nameA - nameB > 0 ? A comes before B
                if (nameA < nameB) {
                    return 1;
                }
                if (nameA > nameB) {
                    return -1;
                }
                return 0;
            });
        }
        else
        {
            arr.sort(function(a,b) {
                var nameA = a.firstname === undefined ? a.firstname : a.firstname.toUpperCase();
                var nameB = b.firstname === undefined ? b.firstname : b.firstname.toUpperCase();
                if (nameA === undefined) { return 1; }
                if (nameB === undefined) { return -1; }

                // Order: A-Z
                // nameA - nameB < 0 ? A comes before B
                // nameA - nameB > 0 ? B comes before A
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            });
        }
    }

    // empty dependency list indicates that useEffect() will only run the function
    // once, which we want, as we only need to get the array of users once
    useEffect(() => {
        console.log("FIRST USE EFFECT RAN")
        async function cover() {
            getLeaderboard()
        }
       cover()
      }, [])

    //=====================================================================

    // ====================================================================
    // Get the object containing the ranking details of the current app user
    const getCurrentObj = () => {
        for (const obj of arr) {
            if (obj.email === currentEmail) {
                return obj
            }
        }
    }
    currentObj = getCurrentObj()
    // =====================================================================


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
        //update sorters
        setSorter1(newSorter1);
        setSorter2(newSorter2);

        // sort leaderboard
        sortLeaderboard(newSorter1, newSorter2);
        // console.log("NEW ARRAY:\n", arr)

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
            <SafeAreaView style = {{...styles.container, backgroundColor: modalVisible ? 'rgba(95, 95, 95, 0.49)' : '#F4F4F4',
                                    opacity: modalVisible ?  0.3 : 1,}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
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
                                            borderTopLeftRadius: arr.findIndex(x => x === item) + 1 == 1 ? 15 : 0,
                                            borderTopRightRadius: arr.findIndex(x => x === item) + 1 == 1 ? 15 : 0,
                                            borderBottomLeftRadius: arr.findIndex(x => x === item) + 1 == 10 ? 15 : 0,
                                            borderBottomRightRadius: arr.findIndex(x => x === item) + 1 == 10 ? 15 : 0,
                                            backgroundColor: item.email === currentEmail ? "#FFEB8F" : 
                                            ((arr.findIndex(x => x === item) + 1) % 2 === 0 ? "#E4E0DB" : "#FFFFFF")}}>
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
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    centeredView: {
        top: Platform.OS == 'android' ? responsiveHeight(50) : responsiveHeight(54)
    },

    modalView: {
        marginHorizontal: responsiveWidth(10),
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
        width: responsiveWidth(80)
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
        paddingTop: 48,
        paddingHorizontal: 20,

    },
    flatListContainer: {
        alignItems: 'center', 
        marginBottom: responsiveHeight(3), 
    },

    pageTitle: {
        // fontFamily: "Arial",
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
        // fontFamily: "Arial",
        fontSize: 14,
        lineHeight: 16,
        color: "#0064A4"
    },

    rankingTitle: {
        // fontFamily: "Arial",
        fontSize: 16,
        marginBottom: 11,
        fontWeight: "bold",
        color: "#555759",
    },

    font: {
        // fontFamily: "Roboto",
        marginBottom: 4,
        color: "#555759"
    },
})

export default LeaderboardForm;