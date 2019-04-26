import React, {Component} from 'react';
import { TextInput, StyleSheet } from 'react-native'
import {Colors} from "../../utils/styles";
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
    textInput: {
        borderRadius: 35,
        paddingHorizontal: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'roboto',
        color: Colors.WHITE,
        marginVertical: 5,
        borderColor: Colors.WHITE,
        borderWidth: 1,
        width: '100%'
    },
    textInputReverse: {
        borderRadius: 35,
        paddingHorizontal: 15,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'roboto',
        color: Colors.APP_MAIN,
        marginVertical: 5,
        borderColor: Colors.APP_MAIN,
        borderWidth: 1,
        width: '100%'
    }
})

class MyTextInput extends Component {
    render() {
        const {style, onChangeText, reverseColor, ...rest} = this.props
        return (
            <TextInput
                style={[reverseColor ? styles.textInputReverse : styles.textInput, style]}
                placeholderTextColor={reverseColor ? Colors.APP_MAIN : Colors.WHITE}
                // placeholder={'username'}
                onChangeText={onChangeText}
                underlineColorAndroid='transparent'
                {...rest}
            />
        );
    }
}

MyTextInput.propTypes = {
    onChangeText: PropTypes.func.isRequired
}


export default MyTextInput;

