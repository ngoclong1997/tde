import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native'
import Text from './MyText'
import PropTypes from 'prop-types';
import {Colors} from "../../utils/styles";

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 35,
        height: 50,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.WHITE,
        backgroundColor: Colors.WHITE,
    },
    text: {

        padding: 10,
        color: Colors.APP_MAIN,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 18
    },
    wrapperReverse: {
        borderRadius: 35,
        height: 50,
        marginVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        borderWidth: 1,
        borderColor: Colors.APP_MAIN,
        backgroundColor: Colors.APP_MAIN,
    },
    textReverse: {
        padding: 10,
        color: Colors.WHITE,
        fontFamily: 'roboto',
        fontWeight: 'bold',
        fontSize: 18
    }
})



class Button extends Component {
    render() {
        const {onPress, title, textStyle, style, reverseColor} = this.props
        return (
            <TouchableOpacity onPress={() => onPress()} style={[reverseColor ? styles.wrapperReverse: styles.wrapper, style]}>
                <Text style={[reverseColor ? styles.textReverse : styles.text, textStyle]}>{title}</Text>
            </TouchableOpacity>
        );
    }
}

Button.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    textStyle: PropTypes.object,
};

export default Button;


