import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PropTypes } from 'prop-types';
class ListItem extends Component {
	static propTypes = {

		title: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		questions: PropTypes.array.isRequired
	}

	_onPress = () => {
		console.log('on Press');
		this.props.onPressItem(this.props.id);
	};

	render() {
		const { id, title, questions } = this.props;
		const cardsNum = questions.length;

		return (
			<TouchableOpacity style={styles.container} onPress={this._onPress}>
				<View>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.cardsNumber}>{cardsNum} cards</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		padding: 15,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: "#999",



	},
	title: {
		flex: 2,
		textAlign: 'center',
		fontSize: 40,
		fontWeight: 'bold',
		color: '#14146F',
		fontFamily: 'sans-serif',
	},

	cardsNumber: {
		flex: 1,
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: "#14146F",
		fontFamily: 'sans-serif',
	}
});

export default ListItem;
