

import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Image, Dimensions, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../middleware'
import RoomImage from '../../../../images/phong_nghi.png'
import ScheduleImage from '../../../../images/tra_lich_trinh.png'
import RestaurantImage from '../../../../images/nha_hang.png'
import TourImage from '../../../../images/tour_du_lich.png'
import HotDealImage from '../../../../images/gia_gio_chot.png'
import WeatherImage from '../../../../images/thoi_tiet.png'
import PlaceImage from '../../../../images/dia_danh.png'
import VehicleImage from '../../../../images/phuong_tien.png'
import SocialImage from '../../../../images/ket_ban.png'
import DemoImage from '../../../../images/khach-san.jpg'


import {Colors} from "../../../utils/styles";
import Feature from "../../common/Feature";
import Swiper from 'react-native-swiper'


const deviceWidth=Dimensions.get('window').width;

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        const {navigation} = this.props
        const images=[DemoImage, DemoImage, DemoImage]
        return (
            <View style={styles.container}>
                <Swiper style={styles.imagesWrapper} activeDotColor={Colors.APP_MAIN}>
                    {images.map((item, index) => (
                        <TouchableWithoutFeedback key={index} onPress={() => alert("Hello")} style={{flex: 1}}>
                            <Image  source={item} style={{width: deviceWidth, height: '100%', resizeMode: 'cover'}}/>
                        </TouchableWithoutFeedback>
                    ))}
                </Swiper>
                <View style={styles.row}>
                    <Feature onPress={() => navigation.navigate('RoomScreen')} title={'Phòng nghỉ'}
                             image={RoomImage}/>
                    <Feature onPress={() => navigation.navigate('ScheduleScreen')} title={'Tra lịch trình'}
                             image={ScheduleImage}/>
                    <Feature onPress={() => navigation.navigate('RestaurantScreen')} title={'Nhà hàng'}
                             image={RestaurantImage}/>
                </View>
                <View style={styles.row}>
                    <Feature onPress={() => navigation.navigate('TourScreen')} title={'Tour du lịch'}
                             image={TourImage}/>
                    <Feature onPress={() => navigation.navigate('HotDealScreen')} title={'Giá giờ CHÓT'}
                             image={HotDealImage}/>
                    <Feature onPress={() => navigation.navigate('WeatherScreen')} title={'Thời tiết'}
                             image={WeatherImage}/>
                </View>
                <View style={styles.row}>
                    <Feature onPress={() => navigation.navigate('PlaceScreen')} title={'Địa danh'}
                             image={PlaceImage}/>
                    <Feature onPress={() => navigation.navigate('VehicleScreen')} title={'Phương tiện'}
                             image={VehicleImage}/>
                    <Feature onPress={() => navigation.navigate('SocialScreen')} title={'Cafe phượt'}
                             image={SocialImage}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BACKGROUND
    },
    imagesWrapper: {
        
    },
    sliderImage: {
        flex: 1,
        width: deviceWidth,
        height: 1000,
        resizeMode: 'contain'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
        paddingHorizontal: 20
    },
    coverImage: {
        height: '100%',
        width: deviceWidth,
        resizeMode: 'cover'
    },
    slider: {
        flex: 1,
        marginBottom: 20
    }
})

const mapStateToProps = (state) => {
    return {
        authStates: state.auth,
        homeStates: state.home
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, home} = actions
    return {
        authActions: bindActionCreators(auth, dispatch)
        homeActions: bindActionCreators(home, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
