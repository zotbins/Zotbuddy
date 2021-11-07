import React, { useState, useEffect } from 'react'
import LeaderboardForm from "./LeaderboardForm"
import LeaderboardHome from "./LeaderboardHome"
import * as firebase from 'firebase'
import 'firebase/firestore'

const LeaderboardPage = props => {
  let page = props.page
  const [arr, setArr] = useState([])
  
  const auth = firebase.auth()
  const email =  auth.currentUser?.email
  const getLeaderboard = async (_) => {
    let arr = []
    const db = firebase.firestore()
    const query = db.collection("users").orderBy('points', 'desc')
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
    }, [])
  
  if (arr.length == 0) {
    return<></>
      
  }
  else {
    console.log("Hello EMAIL ", auth.currentUser?.email)
    if (page == "home") {
      return (
        <LeaderboardHome blood = {arr} email = {email}/>
      )
    }
    else {
      return (
        <LeaderboardForm blood = {arr} email = {email}/>
      )
    }
  }
    
}

export default LeaderboardPage;