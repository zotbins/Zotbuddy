import React, { useState, useEffect } from 'react'
import EventsForm from "./EventsForm"
import * as firebase from 'firebase'
import 'firebase/firestore'

const EventsPage = props => {
  const [arr, setArr] = useState([])
  const getEvents = async (_) => {
    let arr = []
    const db = firebase.firestore()
    const query = db.collection("event").orderBy('startDate', 'asc')
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
        getEvents()
     }
     cover()
    }, [])
  
  if (arr.length == 0) {
    return<></>
      
  }
  else{
    return (
      <EventsForm blood = {arr}/>
    )
  }
    
}

export default EventsPage;