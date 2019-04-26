import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import HorizontalScrollCategory from "../../../common/HorizontalScrollCategory";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class HotDeal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            recommendedHotRooms: [],
            recommendedHotTours: []
        }
    }

    async componentDidMount() {
        const {hotdealActions} = this.props
        try {
            const hotRooms = await hotdealActions.getRecommendedHotDeals(0)
            const hotTours = await hotdealActions.getRecommendedHotDeals(1)

            this.setState({
                recommendedHotRooms: hotRooms,
                recommendedHotTours: hotTours,
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
                        <HorizontalScrollCategory data={this.state.recommendedHotRooms}
                                                  showAllClicked={() => navigation.navigate('AllHotDealScreen', {
                                                      typeID: 0,
                                                      typeName: 'Phòng nghỉ giờ chót'
                                                  })}
                                                  detailPage={'DetailHotDealScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Phòng nghỉ giờ chót'}/>
                        <HorizontalScrollCategory data={this.state.recommendedHotTours}
                                                  showAllClicked={() => navigation.navigate('AllHotDealScreen', {
                                                      typeID: 1,
                                                      typeName: 'Tour giờ chót'
                                                  })}
                                                  detailPage={'DetailHotDealScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Tour giờ chót'} />
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
        hotdealStates: state['hotdeal']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, hotdeal} = actions
    return {
        authActions: bindActionCreators(auth, dispatch),
        hotdealActions: bindActionCreators(hotdeal, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HotDeal);
