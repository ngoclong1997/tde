import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import ProductCard from "../Home";
import RestaurantDemoImage from "../../../../../images/khach-san.jpg";
import VillaImage from "../../../../../images/villa.png";
import HotelImage from '../../../../../images/hotel.png'
import RestHouseImage from '../../../../../images/nha_nghi.png'
import ProductCardFluid from "../../../common/ProductCardFluid";
import HorizontalScrollCategory from "../../../common/HorizontalScrollCategory";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class Room extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            recommendedVillas: [],
            recommendedHotels: [],
            recommendedRestHome: []
        }
    }

    async componentDidMount() {
        const {roomActions} = this.props
        try {
            const villas = await roomActions.getRecommendedRooms(0)
            const hotels = await roomActions.getRecommendedRooms(1)
            const restHomes = await roomActions.getRecommendedRooms(2)
            console.log(villas)
            this.setState({
                recommendedVillas: villas,
                recommendedHotels: hotels,
                recommendedRestHomes: restHomes
            })
        } catch (err) {
            alert(err)
        } finally {
            this.setState({
                loaded: true
            })
        }


    }

    render() {
        const {navigation} = this.props
        return (
            this.state.loaded ? <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.container}>
                        <HorizontalScrollCategory data={this.state.recommendedVillas}
                                                  showAllClicked={() => navigation.navigate('AllRoomScreen', {
                                                      typeID: 0,
                                                      typeName: 'Villa'
                                                  })}
                                                  detailPage={'DetailRoomScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Villa'} categoryPicture={VillaImage}/>
                        <HorizontalScrollCategory data={this.state.recommendedRestHomes}
                                                  showAllClicked={() => navigation.navigate('AllRoomScreen', {
                                                      typeID: 1,
                                                      typeName: 'Nhà nghỉ'
                                                  })}
                                                  detailPage={'DetailRoomScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Nhà nghỉ'} categoryPicture={RestHouseImage}/>
                        <HorizontalScrollCategory data={this.state.recommendedHotels}
                                                  showAllClicked={() => navigation.navigate('AllRoomScreen', {
                                                      typeID: 2,
                                                      typeName: 'Khách sạn'
                                                  })}
                                                  detailPage={'DetailRoomScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Khách sạn'} categoryPicture={HotelImage}/>
                        <HorizontalScrollCategory data={this.state.recommendedHotels}
                                                  showAllClicked={() => navigation.navigate('AllRoomScreen', {
                                                      typeID: 3,
                                                      typeName: 'Home stay'
                                                  })}
                                                  detailPage={'DetailRoomScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Home stay'} categoryPicture={HotelImage}/>
                        <HorizontalScrollCategory data={this.state.recommendedHotels}
                                                  showAllClicked={() => navigation.navigate('AllRoomScreen', {
                                                      typeID: 4,
                                                      typeName: 'Hostel'
                                                  })}
                                                  detailPage={'DetailRoomScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Hostel'} categoryPicture={HotelImage}/>
                    </View>
                </ScrollView>
                :
                <MyActivityIndicator/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

const mapStateToProps = (state) => {
    return {
        authStates: state['auth'],
        roomStates: state['room']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, room} = actions
    return {
        authActions: bindActionCreators(auth, dispatch),
        roomActions: bindActionCreators(room, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Room);
