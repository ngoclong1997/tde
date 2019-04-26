import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';
import {Colors} from "../../utils/styles";


class MyText extends Component {
    render() {
        const {style, children, ...rest} = this.props
        return (
            <Text style={[styles.text, style]} {...rest}>
                {children}
            </Text>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'roboto',
        color: Colors.APP_MAIN
    }
})

export default MyText;