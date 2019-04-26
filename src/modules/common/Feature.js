import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import PropTypes from 'prop-types';
import {Colors} from "../../utils/styles";
import MyText from "./MyText";

const deviceWidth = Math.round(Dimensions.get('window').width)

class Feature extends Component {
    render() {
        const {title, image, onPress} = this.props
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.featureContainer}>
                    <View style={styles.featureBox}>
                        <Image style={styles.image} source={image}/>
                    </View>
                    <MyText style={styles.text}>{title}</MyText>
                </View>
            </TouchableWithoutFeedback >
        );
    }
}

Feature.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired
};


const styles = StyleSheet.create({
    featureBox: {
        backgroundColor: 'rgba(0,191,118, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth/8.0,
        height: deviceWidth/8.0,
        borderRadius: 50
    },
    image: {
        width: deviceWidth/14,
        height: deviceWidth/14,
        resizeMode: 'contain',
    },
    text: {
        fontWeight: 'bold',
        color:Colors.APP_MAIN_BOLD,
        fontSize: 12,
        paddingTop: 5
    },
    featureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: deviceWidth/4.0,
        height: deviceWidth/4.0
    }
})

export default Feature;