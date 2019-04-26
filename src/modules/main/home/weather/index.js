/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {View, Image, FlatList, StyleSheet, ScrollView, TouchableWithoutFeedback} from 'react-native';
import WeatherCard from './WeatherCard';
import axios from 'axios'
import MyText from "../../../common/MyText";
import {ActivityIndicator, TouchableRipple} from "react-native-paper";
import {Text} from "../../../common";
import {Colors} from "../../../../utils/styles";
import * as Animatable from 'react-native-animatable'
import {WeatherConfig} from "../../../../utils/config";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            latitude: 0,
            longitude: 0,
            forecast: null,
            error: '',
            loaded: false,
            currentItem: null,
            selectedIndex: 0
        };
    }

    async componentDidMount() {
        await this._getWeather()
    }

    _getWeather = async () => {

        // Construct the API url to call
        let url = WeatherConfig.BASE_URL;

        // Call the API, and set the state of the weather forecast
        let response = await axios({
            url: url,
            method: 'get',
            params: {
                lat: WeatherConfig.TD_LATTITUDE,
                lon: WeatherConfig.TD_LONGITUDE,
                appid: WeatherConfig.API_KEYS,
                units: 'metric'
            }
        })
        await this.setState({
            forecast: response.data,
        })
        await this.setState({
            currentItem: this.state.forecast.list[0],
            loaded: true
        })
    }

    _selectItem(idx) {
        this.setState({
            currentItem: this.state.forecast.list[idx],
            selectedIndex: idx
        })
        this.zoomIn()
    }

    _handleImageRef = ref => this.image = ref

    zoomIn = () => this.image.zoomIn(500)

    render() {
        return (
            this.state.loaded ?
                <View style={styles.container}>
                    <Text style={styles.title}>Thời tiết tại Tam Đảo</Text>
                    <View style={styles.detailWeather} animation={'slideInRight'} delay={500}>
                        <Animatable.Image ref={this._handleImageRef} style={styles.detailImg}
                               source={{uri: 'https://openweathermap.org/img/w/' + this.state.currentItem.weather[0].icon + '.png'}}/>
                        <View style={styles.weatherInfoBox}>
                            <View style={styles.weatherInfo}>
                                <Text style={styles.weatherInfoKey}>Nhiệt độ trung bình: </Text>
                                <Text style={styles.weatherInfoValue}>{this.state.currentItem.main.temp + '°C '}</Text>

                            </View>
                            <View style={styles.weatherInfo}>
                                <Text style={styles.weatherInfoKey}>Độ ẩm: </Text>
                                <Text style={styles.weatherInfoValue}>{this.state.currentItem.main.humidity + '%'}</Text>
                            </View>
                            <View style={styles.weatherInfo}>
                                <Text style={styles.weatherInfoKey}>Lượng mưa: </Text>
                                <Text style={styles.weatherInfoValue}>{this.state.currentItem.rain['3h'] + 'mm'}</Text>
                            </View>
                        </View>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {this.state.forecast.list.map((item, idx) => {
                            return <WeatherCard selected={this.state.selectedIndex === idx} key={idx} onPress={() => this._selectItem(idx)} detail={item}/>
                        })}
                    </ScrollView>
                </View>
                :
                <MyActivityIndicator/>

        )
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    weatherInfo: {
        flexDirection: 'row'
    },
    weatherInfoKey: {
        fontSize: 16,

    },
    weatherInfoValue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    weatherInfoBox: {

    },
    detailWeather: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.APP_MAIN,
        borderWidth: 1,
        marginBottom: 10
    },
    detailImg: {
        width: 100,
        height: 100,
        resizeMode: 'contain',

    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10,
        alignSelf: 'center'
    }
})