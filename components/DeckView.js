import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet
} from 'react-native';
import { getDeck } from '../utils/api';
import CustomButton from './CustomButton'
import { PropTypes } from 'prop-types';
class DeckView extends Component {
	static propTypes = {

		navigation: PropTypes.shape({
			state: PropTypes.shape({
				params: PropTypes.shape({
					deckTitle: PropTypes.string.isRequired,
				})
			})
		})
	}
	state = {
		deckTitle: '',
		questions: []
	};
	submit = () => {

		this.toNewCard(this.state.deckTitle);

	};
	onStartQuiz = () => {
		if (this.state.questions.length > 0) {
			const deck = {
				deckTitle: this.state.deckTitle,
				questions: this.state.questions
			}

			this.props.navigation.navigate('QuizView', { deckTitle: this.state.deckTitle, questions: this.state.questions, onGoBack: () => this.refresh() });
		} else {
			alert('This Deck Has no Cards please add some Cards to start the Quiz');
		}
	}

	toNewCard = title => {
		this.props.navigation.navigate('NewCardView', { deckTitle: title, onGoBack: () => this.refresh() });
	};
	refresh() {
		getDeck(this.state.deckTitle).then(deck => {
			console.log(deck.questions.length);
			this.setState({
				questions: deck.questions
			});
		});
	}
	static navigationOptions = ({ navigation }) => {
		const { deckTitle } = navigation.state.params;
		return {
			title: deckTitle
		};
	};

	componentDidMount() {
		const deckTitle = this.props.navigation.state.params.deckTitle;
		getDeck(deckTitle).then(deck => {

			this.setState({
				deckTitle: deck.title,
				questions: deck.questions
			});
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ flex: 2, justifyContent: 'center' }}>
					<Text style={styles.title}>{this.state.deckTitle}</Text>
					<Text style={styles.cardsNumber}>{this.state.questions.length} cards</Text>
				</View>
				<View style={styles.row}>
					<CustomButton onPress={this.submit} backgroundColor={'#292477'} text={'Add Card'} color={'white'} />
					<CustomButton onPress={this.onStartQuiz} backgroundColor={'#292477'} text={'Start Quiz'} color={'white'} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		margin: 10,
		marginTop: 100,
		marginBottom: 100,
		borderWidth: 1,
		borderColor: 'lightgrey',
		borderRadius: 10,
		padding: 10,
		justifyContent: 'space-between',
	},

	title: {
		textAlign: 'center',
		fontSize: 40,
		fontWeight: 'bold',
		color: '#14146F',
		fontFamily: 'sans-serif',
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10
	},
	cardsNumber: {

		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: "#14146F",
		fontFamily: 'sans-serif',
	},
});

export default DeckView;
