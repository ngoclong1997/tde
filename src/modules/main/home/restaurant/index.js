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

class Restaurant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            recommendedFoodStore: [],
            recommendedCoffee: [],
            recommendedKaraoke: []
        }
    }

    async componentDidMount() {
        const {restaurantActions} = this.props
        try {
            const foodStore = await restaurantActions.getRecommendedRestaurants(0)
            const coffeeStore = await restaurantActions.getRecommendedRestaurants(1)
            const karaoke = await restaurantActions.getRecommendedRestaurants(2)

            this.setState({
                recommendedFoodStore: foodStore,
                recommendedCoffee: coffeeStore,
                recommendedKaraoke: karaoke
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
                        <HorizontalScrollCategory data={this.state.recommendedFoodStore}
                                                  showAllClicked={() => navigation.navigate('AllRestaurantScreen', {
                                                      typeID: 0,
                                                      typeName: 'Quán ăn'
                                                  })}
                                                  detailPage={'DetailRestaurantScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Quán ăn'} categoryPicture={VillaImage}/>
                        <HorizontalScrollCategory data={this.state.recommendedCoffee}
                                                  showAllClicked={() => navigation.navigate('AllRestaurantScreen', {
                                                      typeID: 1,
                                                      typeName: 'Quán cafe'
                                                  })}
                                                  detailPage={'DetailRestaurantScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Quán cafe'} categoryPicture={RestHouseImage}/>
                        <HorizontalScrollCategory data={this.state.recommendedKaraoke}
                                                  showAllClicked={() => navigation.navigate('AllRestaurantScreen', {
                                                      typeID: 2,
                                                      typeName: 'Quán karaoke'
                                                  })}
                                                  detailPage={'DetailRestaurantScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Quán karaoke'} categoryPicture={HotelImage}/>
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
        restaurantStates: state['restaurant']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, restaurant} = actions
    return {
        authActions: bindActionCreators(auth, dispatch),
        restaurantActions: bindActionCreators(restaurant, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Restaurant);
