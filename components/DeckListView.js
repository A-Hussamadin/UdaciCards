import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getDecks } from '../utils/api';
import ListItem from './ListItem';
import _ from 'lodash';
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
	render() {
		if (this.state.data.length > 0) {
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
					<Text>
						No Decks were found!.
				</Text>

				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},


});

export default DeckListView;
