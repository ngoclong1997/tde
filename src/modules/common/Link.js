import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Text from './MyText'
import PropTypes from 'prop-types';
import {Colors} from "../../utils/styles";

class Link extends Component {
    render() {
        const {text, linkText, onPress, textStyle, linkTextStyle} = this.props
        return (
            <View style={styles.container}>
                <Text style={[styles.defaultTextStyle, textStyle]}>{text}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Text style={[styles.defaultTextLinkStyle, linkTextStyle]}>{linkText}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 5
    },
    defaultTextLinkStyle: {
        color: Colors.APP_MAIN_BOLD,
        fontWeight: 'bold'
    },

    defaultTextStyle: {
        color: Colors.WHITE
    }
})

Link.propTypes = {
    text: PropTypes.string,
    linkText: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    textStyle: PropTypes.object,
    linkTextStyle: PropTypes.object
};

export default Link;