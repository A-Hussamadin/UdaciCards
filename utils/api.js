import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'UdaciCards:decks';
export function saveDeckTitle(deckTitle) {
	//Save Deck Title
	let deck = {
		title: deckTitle,
		questions: []
	};

	AsyncStorage.mergeItem(
		DECK_STORAGE_KEY,
		JSON.stringify({
			[deckTitle]: deck
		})
	);
}

export function addCardToDeck(deckTitle, card) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then(result => {
		const data = JSON.parse(result);
		data[deckTitle].questions.push(card);
		AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
	});
}

export function getDecks() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then(formatDecksResults);
}

function formatDecksResults(results) {
	if (results) {
		let data = JSON.parse(results);

		return Object.values(data);
	}
}

export function getDeck(title) {
	return AsyncStorage.getItem(DECK_STORAGE_KEY).then(results => {
		const data = JSON.parse(results);
		return data[title];
	});
}
