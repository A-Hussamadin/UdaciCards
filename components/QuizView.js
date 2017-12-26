import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import CustomButton from './CustomButton'
import { PropTypes } from 'prop-types';
import { clearLocalNotification, setLocalNotification } from './../utils/helpers'
class QuizView extends Component {
    static propTypes = {

        navigation: PropTypes.shape({
            state: PropTypes.shape({
                params: PropTypes.shape({
                    deckTitle: PropTypes.string.isRequired,
                    questions: PropTypes.array.isRequired
                })
            })
        })
    }

    state = {
        questions: [],
        correctQuestions: 0,
        questionIndex: 0,
        questionsCount: 0,
        questionNumber: 1,
        showResult: false,
        cardfront: true,

    };
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz'
        };
    };



    componentDidMount() {
        const { deckTitle, questions } = this.props.navigation.state.params;
        this.setState((prevState) => {
            return {
                questions: this.props.navigation.state.params.questions,
                questionsCount: this.props.navigation.state.params.questions.length
            }
        });
    }
    componentWillMount() {
        this.initiateAnimationStyle();

    }
    initiateAnimationStyle = () => {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '0deg']
        })

        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });

        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        });
    }





    onAnswerPress = (answer_state, answer) => {
        this.setState((prevState) => {
            if (this.state.questionNumber !== this.state.questionsCount) {

                if (answer_state === answer) {
                    return {
                        correctQuestions: this.state.correctQuestions + 1,
                        questionIndex: this.state.questionIndex + 1,
                        questionNumber: this.state.questionNumber + 1,
                        cardfront: true,
                    }
                } else {
                    return {
                        questionIndex: this.state.questionIndex + 1,
                        questionNumber: this.state.questionNumber + 1,
                        cardfront: true,
                    }
                }

            } else {
                if (answer_state === answer) {
                    return {
                        correctQuestions: this.state.correctQuestions + 1,
                        questionIndex: this.state.questionIndex + 1,
                        questionNumber: this.state.questionNumber + 1,
                        showResult: true,

                    }
                } else {
                    return {
                        questionIndex: this.state.questionIndex + 1,
                        questionNumber: this.state.questionNumber + 1,
                        showResult: true
                    }
                }
                clearLocalNotification().then(setLocalNotification)
            }


        })
        Animated.spring(this.animatedValue, {
            toValue: 0,
        }).start();

    }
    back = () => {
        this.props.navigation.goBack();
    }
    restartQuiz = () => {

        Animated.spring(this.animatedValue, {
            toValue: 0,
            friction: 8,
            tension: 10
        }).start();

        this.setState((prevState) => {
            return {
                correctQuestions: 0,
                showResult: false,
                questionIndex: 0,
                questionNumber: 1,
                cardfront: true,

            }
        })
    }

    flipCard() {

        if (this.value >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();

        }
        this.setState((prevState) => {
            return { cardfront: !this.state.cardfront }
        })

    }
    render() {
        if (this.state.questionsCount > 0) {
            if (!this.state.showResult) {
                const question = this.state.questions[this.state.questionIndex];


                const frontAnimatedStyle = {
                    opacity: this.frontOpacity,
                    transform: [
                        { rotateY: this.frontInterpolate }
                    ]
                }
                const backAnimatedStyle = {
                    opacity: this.backOpacity,
                    transform: [
                        { rotateY: this.backInterpolate }
                    ]
                }
                console.log(this.state.cardfront)
                if (this.state.cardfront) {

                    return (
                        <Animated.View style={[styles.container, styles.flipCard, frontAnimatedStyle]}>
                            <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                                <Text style={styles.questionNumberText}>{this.state.questionNumber}/{this.state.questionsCount}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.flipText}>
                                    {question ? question.question : "Question"}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => this.flipCard()}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>Show Answer!</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    );
                } else {
                    return (
                        <Animated.View style={[styles.container, styles.flipCard, backAnimatedStyle]}>
                            <View style={{ flex: 1, alignSelf: 'flex-start' }}>
                                <Text style={styles.questionNumberText}>{this.state.questionNumber}/{this.state.questionsCount}</Text>
                            </View>
                            <View style={{ flex: 2 }}>
                                <Text style={styles.flipText}>
                                    {question ? question.answer : "Answer"}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'center' }}>
                                <TouchableOpacity onPress={() => this.flipCard()}>
                                    <Text style={{ color: 'red', fontSize: 20 }}>Show Question!</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.row}>

                                <CustomButton onPress={() => this.onAnswerPress(question.answer_state, "correct")} backgroundColor={'green'} text={'Correct'} color={'white'} />
                                <CustomButton onPress={() => this.onAnswerPress(question.answer_state, "incorrect")} backgroundColor={'red'} text={'Incorrect'} color={'white'} />

                            </View>
                        </Animated.View>
                    );
                }

            } else {
                const score = (this.state.correctQuestions * 100) / this.state.questionsCount;

                return (
                    <View style={styles.container}>

                        <Text style={{ flex: 1, alignSelf: 'center', fontSize: 30, color: '#292477', fontFamily: 'sans-serif', fontWeight: "bold" }}>Your Score</Text>
                        <Text style={{ flex: 2, alignSelf: 'center', fontSize: 60, color: 'green', fontFamily: 'sans-serif', fontWeight: "bold" }}>{Number((score).toFixed(1))}%</Text>
                        <Text style={{ flex: 1, alignSelf: 'center', fontSize: 15, color: '#292477', fontFamily: 'sans-serif' }}>You had correctly answerd {this.state.correctQuestions} out of {this.state.questionsCount}</Text>
                        <View style={styles.row}>


                            <CustomButton onPress={() => this.restartQuiz()} backgroundColor={'#292477'} text={'Restart Quiz'} color={'white'} />
                            <CustomButton onPress={() => this.back()} backgroundColor={'#292477'} text={'Back to Deck'} color={'white'} />

                        </View>
                    </View>
                );
            }
        } else {
            return (
                <View>
                    <Text>Loading...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 10,
        marginBottom: 100,
        marginTop: 100,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,


    },
    flipCard: {
        backfaceVisibility: 'hidden',
    },

    flipText: {
        fontSize: 40,
        color: '#222246',
        fontFamily: 'sans-serif',
        alignSelf: 'center'
    },
    questionNumberText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    },

    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    correctBtn: {
        backgroundColor: 'green',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',

    },
    incorrectBtn: {
        backgroundColor: 'red',
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',

    },
    btnText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
    },
});


export default QuizView;