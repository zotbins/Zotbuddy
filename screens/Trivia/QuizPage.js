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
  const [questions, setQuestions] = useState([])
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

  const formatQuestions = async (questionsRef, questionsArr) => {
    questionsRef.forEach((doc) => {
      questionsArr.push({
        id: doc.id,
        choices: doc.data().choices,
        difficulty: doc.data().difficulty,
        question: doc.data().question,
      })
    })
    for (let i = 0; i < questionsArr.length; i++) {
      let choices = await fetchChoice(questionsArr[i].choices)
      questionsArr[i].choices = choices
    }
  }

  const fetchQuestions = async () => {
    try {
      const easyArr = []
      const medArr = []
      const hardArr = []

      const easyQuestionsRef = await firebase
        .firestore()
        .collection('question')
        .where('difficulty', '==', 'EASY')
        .limit(2)
        .get()
      await formatQuestions(easyQuestionsRef, easyArr)

      const mediumQuestionsRef = await firebase
        .firestore()
        .collection('question')
        .where('difficulty', '==', 'MEDIUM')
        .limit(2)
        .get()
      await formatQuestions(mediumQuestionsRef, medArr)

      const hardQuestionsRef = await firebase
        .firestore()
        .collection('question')
        .where('difficulty', '==', 'HARD')
        .limit(1)
        .get()
      await formatQuestions(hardQuestionsRef, hardArr)

      setQuestions([...easyArr, ...medArr, ...hardArr])
    } catch (err) {
      console.error(err)
    }
  }

  //temp solution to select random questions

  const formatAllQuestions = async (questionsRef, questionsArr, limit) => {
    let questionSize = 0

    questionsRef.forEach((doc) => {
      questionSize = questionSize + 1
      questionsArr.push({
        id: doc.id,
        choices: doc.data().choices,
        difficulty: doc.data().difficulty,
        question: doc.data().question,
      })
    })

    //create set and add n unique questions to set
    let indexSet = new Set()
    while (indexSet.size < limit) {
      let random = Math.floor(Math.random() * questionsArr.length) + 1
      indexSet.add(random)
    }

    //change set to array and query the choices using the randomly selected indexes
    let indexArr = Array.from(indexSet)
    for (let i = 0; i < limit; i++) {
      let choices = await fetchChoice(questionsArr[indexArr[i]].choices)
      questionsArr[indexArr[i]].choices = choices
    }
  }

  const fetchAllQuestions = async () => {
    try {
      const easyArr = []
      const medArr = []
      const hardArr = []

      const easyQuestionsRef = await firebase
        .firestore()
        .collection('question')
        .where('difficulty', '==', 'EASY')
        .get()
      await formatAllQuestions(easyQuestionsRef, easyArr, 2)

      const mediumQuestionsRef = await firebase
        .firestore()
        .collection('question')
        .where('difficulty', '==', 'MEDIUM')
        .get()
      await formatAllQuestions(mediumQuestionsRef, medArr, 2)

      const hardQuestionsRef = await firebase
        .firestore()
        .collection('question')
        .where('difficulty', '==', 'HARD')
        .get()
      await formatAllQuestions(hardQuestionsRef, hardArr, 2)

      setQuestions([...easyArr, ...medArr, ...hardArr])
    } catch (err) {
      console.error(err)
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
    let doc = await firebase.firestore().collection('users').doc(userId).get()
    if (!doc.exists) {
      console.log(doc.data())
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
        })
    }
  }

  useEffect(() => {
    //fetch on first render
    fetchQuestions()
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
