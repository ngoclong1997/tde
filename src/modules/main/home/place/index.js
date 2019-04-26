import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'


import HorizontalScrollCategory from "../../../common/HorizontalScrollCategory";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class Place extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            recommendedPublicPlaces: [],
            recommendedStudios: []
        }
    }

    async componentDidMount() {
        const {placeActions} = this.props
        try {
            const publicPlaces = await placeActions.getRecommendedPlaces(0)
            const studios = await placeActions.getRecommendedPlaces(1)

            this.setState({
                recommendedPublicPlaces: publicPlaces,
                recommendedStudios: studios,
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
                        <HorizontalScrollCategory data={this.state.recommendedPublicPlaces}
                                                  showAllClicked={() => navigation.navigate('AllPlaceScreen', {
                                                      typeID: 0,
                                                      typeName: 'Địa điểm công cộng'
                                                  })}
                                                  detailPage={'DetailPlaceScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Địa điểm công cộng'}/>
                        <HorizontalScrollCategory data={this.state.recommendedStudios}
                                                  showAllClicked={() => navigation.navigate('AllPlaceScreen', {
                                                      typeID: 1,
                                                      typeName: 'Studio'
                                                  })}
                                                  detailPage={'DetailPlaceScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Studio'}/>
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
        placeStates: state['place']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, place} = actions
    return {
        authActions: bindActionCreators(auth, dispatch),
        placeActions: bindActionCreators(place, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Place);
