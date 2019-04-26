import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types';
import {ActivityIndicator} from "react-native-paper";

class MyActivityIndicator extends Component {
    render() {
        return (
            <ActivityIndicator style={styles.container}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20
    }
})

MyActivityIndicator.propTypes = {};

export default MyActivityIndicator;