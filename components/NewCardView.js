import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	Picker,
	StyleSheet
} from 'react-native';
import { addCardToDeck } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import CustomButton from './CustomButton'
import { PropTypes } from 'prop-types';
class NewCardView extends Component {

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
		deckTite: '',
		question: '',
		answer: '',
		answer_state: ''
	};
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Add Card'
		};
	};

	saveData = () => {

		if (this.state.question === '') {
			alert("Please Add a question ");
			return;
		}
		if (this.state.answer === '') {
			alert("Please Add an Answer");
			return;
		}
		if (this.state.answer_state === '') {
			alert("Please chose Answer State");
			return;
		}


		const card = {
			question: this.state.question,
			answer: this.state.answer,
			answer_state: this.state.answer_state
		};



		addCardToDeck(this.state.deckTite, card).then(() => {
			this.toHome();
		})

	};

	toHome = () => {

		this.setState({
			deckTite: '',
			question: '',
			answer: '',
			answer_state: ''
		})
		this.props.navigation.state.params.onGoBack();
		this.props.navigation.goBack();


	};
	componentDidMount() {
		//const { goBack } = this.props.navigation;
		this.setState({ deckTite: this.props.navigation.state.params.deckTitle });
	}

	render() {
		//	const deckTitle = this.props.navigation.state.params.deckTitle;

		return (
			<View style={styles.container}>

				<Text style={styles.text}>Question:</Text>
				<TextInput
					multiline={true}
					numberOfLines={3}
					style={styles.textInput}
					onChangeText={question => this.setState({ question })}
					value={this.state.question}
				/>

				<Text style={styles.text}>Answer:</Text>
				<TextInput
					multiline={true}
					numberOfLines={3}
					style={styles.textInput}
					onChangeText={answer => this.setState({ answer })}
					value={this.state.answer}
				/>

				<Text style={styles.text}>Answer State:</Text>
				<Picker style={styles.picker}
					selectedValue={this.state.answer_state}
					onValueChange={answer_state => { this.setState({ answer_state }) }}>
					<Picker.Item label="Please Select Answer State" value="" />
					<Picker.Item label="Correct" value="correct" />
					<Picker.Item label="Incorrect" value="incorrect" />

				</Picker>


				<CustomButton onPress={this.saveData} backgroundColor={'#292477'} text={'Submit'} color={'white'} />


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
	row: {
		flex: 1,
	},

	text: {
		textAlign: 'center',
		fontSize: 15,
		fontWeight: 'bold',
		color: '#14146F',
		fontFamily: 'sans-serif',
		paddingTop: 15,
		alignSelf: 'flex-start'
	},
	textInput: {
		fontSize: 15,
		color: '#222246',
		fontFamily: 'sans-serif',
		alignSelf: 'stretch',

	},
	picker: {

		alignSelf: 'stretch',
	},


});
export default NewCardView;
