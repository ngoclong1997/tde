/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 00:30
 */

import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, Image, Dimensions} from 'react-native'
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
import ImageSlider from "react-native-image-slider";

const deviceWidth=Dimensions.get('window').width;

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }


    render() {
        const {navigation} = this.props
        const images=[
            DemoImage,
            DemoImage,
            DemoImage
        ]
        return (
            <View style={styles.container}>
                <ImageSlider images={images}
                             loop={true}
                             autoPlayWithInterval={1000}
                             customSlide={({index, item, style, width}) => (
                                 <View key={index}>

                                 </View>
                             )}

                />

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
        authStates: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth} = actions
    return {
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);
