import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';
import { PropTypes } from 'prop-types';


export default function CustomButton(props) {


    return (
        <TouchableOpacity

            onPress={props.onPress}
            style={[
                Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn
                , { backgroundColor: props.backgroundColor }]}
        >
            <Text style={[styles.submitBtnText, { color: props.color }]}>{props.text}</Text>
        </TouchableOpacity>
    );
}
CustomButton.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}
const styles = StyleSheet.create({

    iosSubmitBtn: {

        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
        alignSelf: 'center'

    },
    AndroidSubmitBtn: {

        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'

    },
    submitBtnText: {

        fontSize: 22,
        textAlign: 'center'
    },

});

