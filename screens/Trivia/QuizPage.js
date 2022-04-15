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
// import * as firebase from 'firebase'
// import 'firebase/firestore'
import { firebaseDb, firebaseAuth } from '../../firebaseConfig'
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
import { useNavigation } from '@react-navigation/native'

/**
 * Styles need to be refactored for different platforms
 * This is just a quick MVP
 */

const quizCategories = [
  'Zero-Waste Goals',
  "Let's talk trash",
  'Sustainability in Dining',
  'Sustainability Terms & Definitions',
  'Be a Planteater',
  'Testing',
]

LogBox.ignoreLogs(['Setting a timer'])

const QuizPage = (props) => {
  const navigation = useNavigation()
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

  const selectRandom = async(array, amount) => {
    var tempArr = array
    var newArr = []
    console.log("START")
    console.log("---------")
    for (var i = 0; i < amount; i++) {


      var randomNum = Math.floor(Math.random() * tempArr.length)
      newArr.push(tempArr[randomNum])
      tempArr.splice(randomNum, 1)

    }
    return newArr
  }

  // Discontinued Code
  // const oldFetch = async () => {
  //   try {
  //     const questionsRef = await firebaseDb
  //       .collection('questions')
  //       .limit(5)
  //       .get()
  //     let questions = []
  //     questionsRef.forEach((doc) => {
  //       questions.push({
  //         id: doc.id,
  //         choices: doc.data().choices,
  //         difficulty: doc.data().difficulty,
  //         question: doc.data().question,
  //         correctAnswer: doc.data().correctAnswer
  //       })
  //     })
  //     console.log("OLD QUESTIONS", questions)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }
  const fetchQuestions = async () => {
    try {
      const easyQuestionsRef = await firebaseDb
        .collection('questions')
        .where("difficulty", '==', "EASY")
        .get()
      
      const mediumQuestionsRef = await firebaseDb
        .collection('questions')
        .where("difficulty", '==',"MEDIUM")
        .get()

      const hardQuestionsRef = await firebaseDb
        .collection('questions')
        .where("difficulty", '==',"HARD")
        .get()
      
      let easyQuestions = []
      let mediumQuestions = []
      let hardQuestions = []

      easyQuestionsRef.forEach((doc) => {
        easyQuestions.push({id: doc.id,
          choices: doc.data().choices,
          difficulty: doc.data().difficulty,
          question: doc.data().question,
          correctAnswer: doc.data().correctAnswer})
      })

      mediumQuestionsRef.forEach((doc) => {
        mediumQuestions.push({id: doc.id,
          choices: doc.data().choices,
          difficulty: doc.data().difficulty,
          question: doc.data().question,
          correctAnswer: doc.data().correctAnswer})
      })

      hardQuestionsRef.forEach((doc) => {
        hardQuestions.push({id: doc.id,
          choices: doc.data().choices,
          difficulty: doc.data().difficulty,
          question: doc.data().question,
          correctAnswer: doc.data().correctAnswer})
      })

      let selectedEasyQuestions = await selectRandom(easyQuestions, 1)
      let selectedMediumQuestions = await selectRandom(mediumQuestions, 2)
      let selectedHardQuestions = await selectRandom(hardQuestions, 2)
      let questions = []
      for (var i = 0; i < 1; i++) {
        questions.push(selectedEasyQuestions[i])
      }
      for (var i = 0; i < 2; i++) {
        questions.push(selectedMediumQuestions[i])
      }
      for (var i = 0; i < 2; i++) {
        questions.push(selectedHardQuestions[i])
      }
      console.log("START OF ALL QUESTIONS")
      // console.log(questions)
      
      // for (let i = 0; i < questions.length; i++) {
      //   let choices = await fetchChoice(questions[i].choices)
      //   questions[i].choices = choices
      // }
      setQuestions([...questions])
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
        question.choices[question.userChoice] ==
        question.correctAnswer
      ) {
        console.log("Correct")
        console.log(question.question)
        console.log(question.choices[question.userChoice])
        console.log(question.correctAnswer)
        return acc + 1
      } else {
        console.log("Incorrect")
        console.log(question.question)
        console.log(question.userChoice)
        console.log(question.choices[question.userChoice])
        console.log(question.correctAnswer)
        return acc
      }
    }, 0)
  }

  const onSubmit = async () => {
    const correct = calculateScore()
    const dbh = firebaseDb
    let userId = await SecureStore.getItemAsync('uid')
    let doc = await dbh.collection('users').doc(userId).get()
    if (!doc.exists) {
      alert('No user data found!')
    } else {
      let dataObj = doc.data()
      dataObj.points += correct;
      console.log(dataObj.points)
      dbh.collection('users').doc(userId).update({
        points: dataObj.points,
        showQuiz: 0,
        
      })
      // setValue('points', dataObj.points + correct, true);
      navigation.navigate("Main")
    }
  }

  useEffect(() => {
    //fetch on first render
    fetchQuestions()
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
        <Text>Loading stuff</Text>
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
