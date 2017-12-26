import React, { Component } from 'react';

import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	StyleSheet
} from 'react-native';
import { saveDeckTitle } from '../utils/api';
import { NavigationActions } from 'react-navigation';
import CustomButton from './CustomButton'
function SubmitBtn({ onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={
				Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
			}
		>
			<Text style={styles.submitBtnText}>SUBMIT</Text>
		</TouchableOpacity>
	);
}



class NewDeckView extends Component {
	state = {
		title: ''
	};


	submit = () => {

		if (this.state.title === '') {
			alert("Please add a Deck Title");
			return;
		}

		saveDeckTitle(this.state.title);
		this.props.navigation.navigate('DeckView', {
			deckTitle: this.state.title,

		});
		this.setState(() => ({ title: '' }));

	};



	render() {
		return (
			<View style={styles.container}>

				<Text style={styles.text}>What is the title of your new Deck?</Text>
				<TextInput

					style={styles.textInput}
					onChangeText={title => this.setState({ title })}
					value={this.state.title}
				/>


				<CustomButton onPress={this.submit} backgroundColor={'#292477'} text={'Submit'} color={'white'} />


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
		alignItems: 'center',
	},
	row: {
		flex: 1,
	},

	text: {
		textAlign: 'center',
		fontSize: 30,
		fontWeight: 'bold',
		color: '#14146F',
		fontFamily: 'sans-serif',
		paddingTop: 15,
		alignSelf: 'flex-start'
	},
	textInput: {
		fontSize: 30,
		color: '#222246',
		fontFamily: 'sans-serif',
		alignSelf: 'stretch',

	},


});

export default NewDeckView;
