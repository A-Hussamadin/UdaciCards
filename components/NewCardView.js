import React, { Component } from 'react';
import { purple, white } from '../utils/colors';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	StyleSheet
} from 'react-native';

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
class NewCardView extends Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: 'Add Card'
		};
	};
	render() {
		return (
			<View>
				<Text>Question:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				/>

				<Text>Answer:</Text>
				<TextInput
					style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
				/>

				<SubmitBtn onPress={this.submit} />
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	row: {
		flexDirection: 'row',
		flex: 1,
		alignItems: 'center'
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	AndroidSubmitBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 2,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 30,
		marginRight: 30
	}
});
export default NewCardView;
