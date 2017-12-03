import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import NewCardView from './components/NewCardView';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';

function UdaciStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar translucent backgroundColor={backgroundColor} {...props} />
		</View>
	);
}
const Tabs = TabNavigator(
	{
		DeckList: {
			screen: DeckListView,
			navigationOptions: {
				tabBarLabel: 'Deck List',
				TabBarIcon: ({ tintColor }) => (
					<Ionicons name="ios-list-box" size={30} color={tintColor} />
				)
			}
		},
		NewDeck: {
			screen: NewDeckView,
			navigationOptions: {
				tabBarLabel: ' New Deck',
				TabBarIcon: ({ tintColor }) => (
					<Ionicons name="ios-add" size={30} color={tintColor} />
				)
			}
		}
	},
	{
		navigationOptions: {
			header: null
		},
		tabBarOptions: {
			activeTintColor: Platform.OS === 'ios' ? purple : white,
			style: {
				height: 56,
				backgroundColor: Platform.OS === 'ios' ? white : purple,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				},
				shadowRadius: 6,
				shadowOpacity: 1
			}
		}
	}
);

const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs
	},
	NewCardView: {
		screen: NewCardView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	}
});

export default class App extends React.Component {
	render() {
		return (
			<View style={{ flex: 1 }}>
				<UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
				<MainNavigator />
			</View>
		);
	}
}
