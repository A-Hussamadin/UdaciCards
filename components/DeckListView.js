import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../utils/api';
import ListItem from './ListItem';
import _ from 'lodash';
import CustomButton from './CustomButton'
class DeckListView extends Component {
	_onPressItem = id => {
		// updater functions are preferred for transactional updates
		const deckTitle = this.state.data[id].title;
		this.props.navigation.navigate('DeckView', {
			deckTitle: deckTitle,

		});
	};

	state = {
		data: []
	};
	componentDidMount() {
		getDecks().then(data => {
			this.setState({ data });
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.screenProps.currentScreen === 'DeckList') {
			getDecks().then(data => {
				this.setState({ data });
			});
		}
	}

	_renderItem = ({ item }) => (
		<ListItem
			id={_.findIndex(this.state.data, ['title', item.title])}
			title={item.title}
			questions={item.questions}
			onPressItem={this._onPressItem}
		/>
	);
	toNewDeckView = () => {
		this.props.navigation.navigate('NewDeck');
	}
	render() {
		if (this.state.data) {
			return (
				<View style={styles.container}>
					<FlatList
						data={this.state.data}
						renderItem={this._renderItem}
						keyExtractor={(item, index) => index}
					/>

				</View>
			);
		} else {
			return (
				<View style={styles.container}>
					<View style={styles.empty}>
						<Text style={styles.text}>
							No Decks were found :(
						</Text>
						<CustomButton onPress={this.toNewDeckView} backgroundColor={'#292477'} text={'Add New Deck'} color={'white'} />
					</View>

				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	empty: {
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
	text: {
		textAlign: 'center',
		fontSize: 40,
		fontWeight: 'bold',
		color: '#14146F',
		fontFamily: 'sans-serif',
	},

});

export default DeckListView;
