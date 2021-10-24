import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import {
    Text,
    Card,
} from 'native-base'

const progressBarPercents = ['20%', '40%', '60%', '80%', '100%'];

const QuizForm = (props) => {
  const {
    questions,
    currentIndex,
    nextQuestion,
    previousQuestion,
    saveChoice,
    onSubmit,
    chosenAnswer
  } = props

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Title of Daily Trivia Quiz!</Text>
        </View>
        <View>
            <View style={styles.progressBar}>
                <View style={styles.absoluteFill} width={progressBarPercents[currentIndex]} />
            </View>
            <Text style={styles.questionNumText}>Question {currentIndex  + 1} of 5</Text>
        </View>
        <View style={styles.questionView}>
            <Card style={styles.questionCard}>
                <Text style={styles.questionText}>{questions[currentIndex].question}</Text>
            </Card>
        </View>
        <View>
            <View style={styles.answerView}>
                {questions[currentIndex].choices.map((choice, index) => {
                    return(
                        <TouchableOpacity onPress={() => saveChoice(index)} key={index}>
                            <Card style={chosenAnswer === index ? styles.answerChosenCard : styles.answerCard}>
                                <Text style={chosenAnswer === index ? styles.cardChosenText : styles.cardText}>{choice}</Text>
                            </Card>
                        </TouchableOpacity>
                    )
                })}
            </View>
            <View style={styles.buttonsView}>
                {(!currentIndex) ?
                    <TouchableOpacity disabled={currentIndex === 4} onPress={nextQuestion} style={styles.button}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>
                : (currentIndex < 4) ?
                    <>
                        <TouchableOpacity disabled={!currentIndex} onPress={previousQuestion} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={currentIndex === 4} onPress={nextQuestion} style={styles.button}>
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </>
                :
                    <>
                        <TouchableOpacity disabled={!currentIndex} onPress={previousQuestion} style={styles.backButton}>
                            <Text style={styles.backButtonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity disabled={currentIndex < 4} onPress={onSubmit} style={styles.button}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4'
    },
    header: {
        backgroundColor: 'white',
        height: '15%'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#0064A4',
        textAlign: 'left',
        marginTop: 70,
        marginLeft: 20,
    },
    progressBar: {
        height: 20,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        borderRadius: 10
    },
    absoluteFill: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "#94C83D",
        borderRadius: 10,
    },
    questionNumText: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 20
    },
    questionView: {
        marginVertical: 15,
        height: '23%',
        width: '90%',
        alignSelf: 'center',
    },
    questionCard: {
        width: '98%',
        height: '100%',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    questionText: {
        fontSize: 20,
        color: '#555759',
        textAlign: 'left'
    },
    cardText: {
        fontSize: 18,
        color: '#555759',
        textAlign: 'center'
    },
    cardChosenText: {
        fontSize: 18,
        color: 'white',
        textAlign: 'center'
    },
    answerCard: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 160,
        height: 100,
    },
    answerChosenCard: {
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: '#6AA2B8',
        width: 160,
        height: 100,
    },
    answerView: {
        marginBottom: 20,
        justifyContent: 'space-around',
        width: '89%',
        height: '50%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    buttonsView: {
        justifyContent: 'space-around',
        width: '89%',
        height: '10%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center'
    },
    button: {
        alignSelf: 'center',
        width: '35%',
        height: 40,
        marginTop: 10,
        marginBottom: 25,
        backgroundColor: '#0064A4',
        borderRadius: 20,
        justifyContent: 'center'
    },
    backButton: {
        alignSelf: 'center',
        width: '35%',
        height: 40,
        marginTop: 10,
        marginBottom: 25,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#555759'
    },
    buttonText: {
        color: 'white',
        fontSize: 17,
        textTransform: 'capitalize',
        alignSelf: 'center'
    },
    backButtonText: {
        color: '#555759',
        fontSize: 17,
        textTransform: 'capitalize',
        alignSelf: 'center'
    },
})

export default QuizForm