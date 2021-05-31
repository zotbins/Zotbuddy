import React, { useState, useEffect } from 'react'
import LeaderboardForm from "./LeaderboardForm"
import * as firebase from 'firebase'
import 'firebase/firestore'

const LeaderboardPage = props => {
  const [arr, setArr] = useState([])
  
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
  else{
    return (
      <LeaderboardForm blood = {arr}/>
    )
  }
    
}

export default LeaderboardPage;