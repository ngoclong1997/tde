/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {Text, Card, Divider} from 'react-native-elements';
import Moment from 'moment'
import 'moment/locale/vi'
import {Colors} from "../../../../utils/styles";


export default class WeatherCard extends Component {

    render() {


        // Create a new date from the passed date time
        let date = new Date(this.props.detail.dt * 1000);

        Moment.locale('vi')

        let time = Moment(date).format('LT')

        let today = Moment(date).format("dddd");
        today = today.charAt(0).toUpperCase() + today.slice(1)

        const {selected} = this.props
        return (
            <TouchableWithoutFeedback onPress={this.props.onPress}>
                <View style={selected ? styles.cardSelected : styles.card}>
                    <Image style={{width: 70, height: 70}}
                           source={{uri: 'https://openweathermap.org/img/w/' + this.props.detail.weather[0].icon + '.png'}}/>
                    <Text style={selected ? styles.timeSelected : styles.time}>{time}</Text>
                    <Text style={selected ? styles.dateSelected : styles.date}>{today}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    card: {

        borderWidth: 1,
        borderColor: Colors.APP_MAIN,
        borderRadius: 5,
        width: Dimensions.get('window').width / 3.3,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        flex: 1
    },
    cardSelected: {
        backgroundColor: Colors.APP_MAIN,
        borderWidth: 0,
        borderRadius: 5,
        width: Dimensions.get('window').width / 3.3,
        height: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        flex: 1
    },
    date: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.APP_MAIN,
    },
    dateSelected: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.WHITE,
    },
    time: {
        fontSize: 18,
        color: Colors.APP_MAIN
    },
    timeSelected: {
        fontSize: 18,
        color: Colors.WHITE
    }
});