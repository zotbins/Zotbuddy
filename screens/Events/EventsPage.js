import React, { useState, useEffect } from 'react'
import EventsForm from "./EventsForm"
import * as firebase from 'firebase'
import 'firebase/firestore'

const EventsPage = props => {
  const [arr, setArr] = useState([])
  const [todayArr, setTodayArr] = useState([])

  const getEvents = async (_) => {
    let arr = []
    var today = new Date();
    const db = firebase.firestore()
    var query = db.collection("event").orderBy('startDate', 'asc')
    await query.get().then((querySnapshot) => {
        querySnapshot.forEach((userDoc) => {
            arr.push({...userDoc.data(), key: arr.length + 1})
            arr[arr.length-1]["startDate"] = userDoc.data().startDate.toDate()
            arr[arr.length-1]["endDate"] = userDoc.data().endDate.toDate()
            
            //FIX: only push the events for today into the TodayArr 
            if(userDoc.data().startDate === today){
                todayArr.push({...userDoc.data(), key: todayArr.length + 1})
                todayArr[todayArr.length-1]["startDate"] = userDoc.data().startDate.toDate()
                todayArr[todayArr.length-1]["endDate"] = userDoc.data().endDate.toDate()
            }
        })
    })
    console.log(arr)
    setArr(arr)

    console.log(todayArr)
    setTodayArr(todayArr)
  }
  useEffect(() => {
     async function cover(){
        getEvents()
     }
     cover()
    }, [])
  
  if (arr.length == 0) {
    return<></>
      
  }
  else{
    return (
      <EventsForm blood = {todayArr} other = {todayArr}/>
    )
  }
    
}

export default EventsPage;