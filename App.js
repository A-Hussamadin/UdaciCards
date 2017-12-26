import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import DeckListView from './components/DeckListView';
import NewDeckView from './components/NewDeckView';
import NewCardView from './components/NewCardView';
import DeckView from './components/DeckView';
import QuizView from './components/QuizView';
import { purple, white } from './utils/colors';
import { Constants } from 'expo';

import { setLocalNotification } from './utils/helpers'

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
	DeckView: {
		screen: DeckView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	},
	NewCardView: {
		screen: NewCardView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	},
	QuizView: {
		screen: QuizView,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	}
});
function getCurrentRouteName(navigationState) {
	if (!navigationState) {
		return null;
	}
	const route = navigationState.routes[navigationState.index];
	// dive into nested navigators
	if (route.routes) {
		return getCurrentRouteName(route);
	}
	return route.routeName;
}
export default class App extends React.Component {
	state = { currentScreen: null }
	async componentWillMount() {
		await Expo.Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		});
	}

	componentDidMount() {
		setLocalNotification();
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				<UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
				<MainNavigator onNavigationStateChange={(prevState, currentState) => {
					const currentScreen = getCurrentRouteName(currentState);
					const prevScreen = getCurrentRouteName(prevState);

					if (prevScreen !== currentScreen) {

						this.setState({ currentScreen: currentScreen });
						this.setState({ prevScreen: prevScreen });
					}
				}} screenProps={{ currentScreen: this.state.currentScreen }} />
			</View>
		);
	}
}
