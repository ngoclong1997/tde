import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'


import HorizontalScrollCategory from "../../../common/HorizontalScrollCategory";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class Vehicle extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            recommendedMotorbikes: [],
            recommendedTravelCars: [],
            recommendedBuses: []
        }
    }

    async componentDidMount() {
        const {vehicleActions} = this.props
        try {
            const motorbikes = await vehicleActions.getRecommendedVehicles(0)
            const travelCars = await vehicleActions.getRecommendedVehicles(1)
            const buses = await vehicleActions.getRecommendedVehicles(2)

            this.setState({
                recommendedMotorbikes: motorbikes,
                recommendedTravelCars: travelCars,
                recommendedBuses: buses
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
                        <HorizontalScrollCategory data={this.state.recommendedMotorbikes}
                                                  showAllClicked={() => navigation.navigate('AllVehicleScreen', {
                                                      typeID: 0,
                                                      typeName: 'Thuê xe máy'
                                                  })}
                                                  detailPage={'DetailVehicleScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Thuê xe máy'}/>
                        <HorizontalScrollCategory data={this.state.recommendedTravelCars}
                                                  showAllClicked={() => navigation.navigate('AllVehicleScreen', {
                                                      typeID: 1,
                                                      typeName: 'Thuê xe du lịch'
                                                  })}
                                                  detailPage={'DetailVehicleScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Thuê xe du lịch'} />
                        <HorizontalScrollCategory data={this.state.recommendedBuses}
                                                  showAllClicked={() => navigation.navigate('AllVehicleScreen', {
                                                      typeID: 1,
                                                      typeName: 'Thuê xe bus'
                                                  })}
                                                  detailPage={'DetailVehicleScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Thuê xe bus'} />
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
        vehicleStates: state['vehicle']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, vehicle} = actions
    return {
        authActions: bindActionCreators(auth, dispatch),
        vehicleActions: bindActionCreators(vehicle, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Vehicle);
