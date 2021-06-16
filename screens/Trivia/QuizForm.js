import React, { useState, useEffect, useCallback } from 'react'
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
import { Path, Svg } from 'react-native-svg'

const QuizForm = (props) => {
  const {
    questions,
    currentIndex,
    nextQuestion,
    previousQuestion,
    saveChoice,
    onSubmit,
  } = props

  return (
    <View style={styles.container}>
      <View>
        <Text>question: {currentIndex + 1}</Text>
        <Text>{questions[currentIndex].question}</Text>
        <Text>{questions[currentIndex].difficulty}</Text>
        <View style={styles.buttonRowContainer}>
          {questions[currentIndex].choices.map((choice, index) => {
            return (
              <TouchableOpacity
                style={styles.button}
                key={index}
                onPress={() => saveChoice(index)}
              >
                <Text style={{ color: '#6AA2B8', textAlign: 'center' }}>
                  {choice.choiceText}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={styles.buttonRowContainer}>
          <TouchableOpacity
            style={styles.button}
            disabled={!currentIndex}
            onPress={previousQuestion}
          >
            <Text style={{ color: '#6AA2B8', textAlign: 'center' }}>prev</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text style={{ color: '#6AA2B8', textAlign: 'center' }}>
              submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={currentIndex === 4}
            onPress={nextQuestion}
          >
            <Text style={{ color: '#6AA2B8', textAlign: 'center' }}>next</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  button: {
    marginTop: 5,
    borderRadius: 20,
    width: 85,
    height: 40,
    borderColor: '#6AA2B8',
    justifyContent: 'center',
    borderWidth: 1,
  },
})

export default QuizForm
