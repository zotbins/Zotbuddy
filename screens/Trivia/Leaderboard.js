import React, { useState } from 'react'
import { 
  StyleSheet,
} from 'react-native'
import { 
  Container, 
  Header, 
  Content, 
  Card, 
  CardItem, 
  Thumbnail, 
  Text, 
  Button, 
  Icon, 
  Left, 
  Body, 
  Right,
  Title,
  Accordion,
} from 'native-base'

import petr from '../../assets/images/petr.jpg'

const mockUsers = [
  {
    username: 'Simon Mignolet',
    points: 1134
  },
  {
    username: 'Nathaniel Clyne',
    points: 855
  },
  // {
  //   username: 'Dejan Lovren',
  //   points: 342
  // },
]

const Leaderboard = props => {

  //Needs fixing but it's not important... ;p
  const Trophy = (place) => {
    let trophyColor
    if (place === 0) {
      trophyColor = '#C9B037'
    } else if (place === 1) {
      trophyColor = '#D7D7D7' 
    } else if (place === 2) {
      trophyColor = '#AD8A56' 
    }
    if (trophyColor) {
      return <Icon name='trophy-outline' style={{ color: trophyColor}}/>
    } else {
      return <></>
    }
  }

  return (
    <Card>
      <CardItem style={styles.headerContainer}>
        <Left>
          <Thumbnail source={petr} />
          <Body>
            <Text>Petr</Text>
            <Text note>100 Points</Text>
          </Body>
        </Left>
      </CardItem>
      {/**
       * Add the leaderboard to an accordian later
       */}
      {mockUsers.map((user, i) => (
        <CardItem style={styles.headerContainer} key={i}>
          <Left>
            <Body>
              <Trophy place={i}/>
              <Text>{user.username}</Text>
            </Body>
          </Left>
          <Right>
            <Text note>{user.points} Points</Text>
          </Right>
        </CardItem>
      ))}
      <CardItem>
        <Left>
          <Button transparent>
            <Text>stats</Text>
          </Button>
        </Left>
        <Right>
          <Button transparent >
            <Text>list more</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#d3d3d3',
  },
  leaderboardText: {
    textAlign: 'center',
  }
})

export default Leaderboard