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

const QuizPage = (props) => {
  const [questions, setQuestions] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [chosenAnswer, setChosenAnswer] = useState(4)

  const fetchChoice = async (docRefs) => {
    try {
      let choices = []
      for (let i = 0; i < docRefs.length; i++) {
        const docSnapShot = await docRefs[i].get()
        choices.push(docSnapShot.data())
      }
      return choices
    } catch (err) {
      console.log(err)
    }
  }

  const fetchQuestions = async () => {
    try {
      const questionsRef = await firebase
        .firestore()
        .collection('question')
        .get()
      let questions = []
      questionsRef.forEach((doc) => {
        questions.push({
          id: doc.id,
          choices: doc.data().choices,
          difficulty: doc.data().difficulty,
          question: doc.data().question,
        })
      })
      for (let i = 0; i < questions.length; i++) {
        let choices = await fetchChoice(questions[i].choices)
        questions[i].choices = choices
      }
      setQuestions([...questions])
    } catch (err) {
      console.error(err)
    }
  }

  const fetchDifficultyList = async () => {
    try {
      const questionsRef = await firebase
        .firestore()
        .collection('difficulty')
        .get()
      let questions = {
        easyArray: questionsRef.docs[0].data().easyArray,
        easyArraySize: questionsRef.docs[0].data().easyArraySize,
        mediumArray: questionsRef.docs[0].data().mediumArray,
        mediumArraySize: questionsRef.docs[0].data().mediumArraySize,
        hardArray: questionsRef.docs[0].data().hardArray,
        hardArraySize: questionsRef.docs[0].data().hardArraySize,
      }
      console.log(questions.easyArray[1].id)
      const data = await questions.easyArray[1].get()
      console.log(data.data().question)
      //fetchQuestionsList(questions.easyArr.splice(0, 5))
    } catch (err) {
      console.error(err)
    }
  }

  const fetchQuestionsList = async (docRefs) => {
    try {
      let questions = []
      for (let i = 0; i < docRefs.length; i++) {
        const docSnapShot = await docRefs[i].get()
        console.log(docSnapShot.data())
        questions.push(docSnapShot.data())
      }
      for (let i = 0; i < questions.length; i++) {
        let choices = await fetchChoice(questions[i].choices)
        questions[i].choices = choices
      }
    } catch (err) {
      console.log(err)
    }
  }

  const nextQuestion = () => {
    //increment questionIndex
    if (0 <= currentIndex < questions.length) {
      setCurrentIndex(currentIndex + 1)
    }
    setChosenAnswer(questions[currentIndex + 1].userChoice)
  }

  const previousQuestion = () => {
    //decrement questionIndex
    if (0 <= currentIndex < questions.length) {
      setCurrentIndex(currentIndex - 1)
    }
    setChosenAnswer(questions[currentIndex - 1].userChoice)
  }

  const saveChoice = (choiceIndex) => {
    questions[currentIndex].userChoice = choiceIndex
    setQuestions([...questions])
    setChosenAnswer(choiceIndex)
  }

  const calculateScore = () => {
    return questions.reduce((acc, question) => {
      if (
        question.userChoice &&
        question.choices[question.userChoice].isAnswer
      ) {
        return acc + 1
      } else {
        return acc
      }
    }, 0)
  }

  const onSubmit = async () => {
    const correct = calculateScore()
    let userId = await SecureStore.getItemAsync('uid')
    let doc = dbh.collection('users').doc(userId).get()
    if (!doc.exists) {
      alert('No user data found!')
    } else {
      let dataObj = doc.data()
      setValue('points', dataObj.points + correct, true)
    }
  }

  useEffect(() => {
    //fetch on first render
    fetchQuestions()
    fetchDifficultyList()
  }, [])

  return (
    <View style={styles.container}>
      {questions ? (
        <QuizForm
          questions={questions}
          currentIndex={currentIndex}
          nextQuestion={nextQuestion}
          previousQuestion={previousQuestion}
          saveChoice={saveChoice}
          onSubmit={onSubmit}
          chosenAnswer={chosenAnswer}
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
