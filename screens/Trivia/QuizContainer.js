import React, { useState, useEffect, useCallback } from 'react'
import { 
  Dimensions,
  StyleSheet, 
  View,
  Pressable,
  TouchableOpacity
} from 'react-native'
import { Path, Svg } from 'react-native-svg'
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Title,
  Text,
  Button,
  Card,
  CardItem,
} from 'native-base'

/**
 * Styles need to be refactored for different platforms
 * This is just a quick MVP
 */

const quizCategories = [
  'Zero-Waste Goals',
  'Let\'s talk trash',
  'Sustainability in Dining',
  'Sustainability Terms & Definitions',
  'Be a Planteater',
  'Testing'
]

const QuizContainer = props => {
  //create container and pass question as props
  const [questions, setQuestions] = useState(props.questions)

  const formatData = () => {
    //reformat the queried data
  }

  const fetchQuestions = async () => {
    //fetch questions here
    //then reformat data
    formatData()
  }

  useEffect(() => {
    //fetch on first render
    fetchQuestions()
  }, [])

  return (
    <View style={styles.container}>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf3f6'
  },
  contentContainer: {
    marginTop: 34,
    marginHorizontal: 10
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 35
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width
  },
  categoryTitleText: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 24
  },
  categoryText: {
    fontSize: 10
  },
  buttonRowContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default QuizContainer