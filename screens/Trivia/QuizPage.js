import React, { useState, useEffect, useCallback } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  Pressable,
  TouchableOpacity,
  LogBox,
} from 'react-native'
import { Path, Svg } from 'react-native-svg'
import firebase from 'firebase'
import * as SecureStore from 'expo-secure-store'
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
import QuizForm from './QuizForm'

/**
 * Styles need to be refactored for different platforms
 * This is just a quick MVP
 */

LogBox.ignoreLogs(['Setting a timer'])

const QuizPage = () => {
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const fetchAllQuestions = async () => {
    try {
      const questionArr = []

      const questionRef = await firebase
        .firestore()
        .collection('questions')
        .get()

      while (questionArr.length < 5) {
        let random = Math.floor(Math.random() * questionRef.size)
        if (questionArr.indexOf(random) === -1) {
          questionArr.push({
            choices: questionRef.docs[random].data().choices,
            difficulty: questionRef.docs[random].data().difficulty,
            question: questionRef.docs[random].data().question,
            correctAnswer: questionRef.docs[random].data().correctAnswer,
          })
        }
      }
      setQuestions(questionArr)
    } catch (err) {
      console.error(err)
    }
  }

  const nextQuestion = () => {
    //increment questionIndex
    if (0 <= currentIndex < questions.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previousQuestion = () => {
    //decrement questionIndex
    if (0 <= currentIndex < questions.length) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const saveChoice = (choiceIndex) => {
    questions[currentIndex].userChoice = choiceIndex
    setQuestions([...questions])
  }

  const calculateScore = () => {
    return questions.reduce((acc, question) => {
      if (question.choices[question.userChoice] === question.correctAnswer) {
        return acc + 1
      } else {
        return acc
      }
    }, 0)
  }

  const onSubmit = async () => {
    const correct = calculateScore()
    let userId = await SecureStore.getItemAsync('uid')
    let doc = await firebase.firestore().collection('users').doc(userId).get()
    if (!doc.exists) {
      alert('No user data found!')
    } else {
      let dataObj = doc.data()
      await firebase
        .firestore()
        .collection('users')
        .doc(userId)
        .set({
          ...dataObj,
          points: dataObj.points + correct,
          //showQuiz: 1, //uncomment after testing
        })
    }
  }

  useEffect(() => {
    //fetch on first render
    //fetchQuestions()
    fetchAllQuestions()
  }, [])

  return (
    <View style={styles.container}>
      {questions.length ? (
        <QuizForm
          questions={questions}
          currentIndex={currentIndex}
          nextQuestion={nextQuestion}
          previousQuestion={previousQuestion}
          saveChoice={saveChoice}
          onSubmit={onSubmit}
        />
      ) : (
        <Text>Loading Questions</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf3f6',
  },
  contentContainer: {
    marginTop: 34,
    marginHorizontal: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginTop: 35,
  },
  svgCurve: {
    position: 'absolute',
    width: Dimensions.get('window').width,
  },
  categoryTitleText: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 24,
  },
  categoryText: {
    fontSize: 10,
  },
  buttonRowContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    height: 90,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default QuizPage
