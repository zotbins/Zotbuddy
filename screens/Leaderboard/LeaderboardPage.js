import React from 'react'
import LeaderboardForm from "./LeaderboardForm"

const LeaderboardPage = props => {
  let page = props.page
  return (
    <LeaderboardForm page = {page}/>
  )
}

export default LeaderboardPage;