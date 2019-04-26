import React, {Component} from 'react'
import {View, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'


import HorizontalScrollCategory from "../../../common/HorizontalScrollCategory";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class Tour extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            recommendedOneDayTours: [],
            recommendedMultipleDayTours: []
        }
    }

    async componentDidMount() {
        const {tourActions} = this.props
        try {
            const oneDayTours = await tourActions.getRecommendedTours(0)
            const multipleDayTours = await tourActions.getRecommendedTours(1)

            this.setState({
                recommendedOneDayTours: oneDayTours,
                recommendedMultipleDayTours: multipleDayTours,
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
                        <HorizontalScrollCategory data={this.state.recommendedOneDayTours}
                                                  showAllClicked={() => navigation.navigate('AllTourScreen', {
                                                      typeID: 0,
                                                      typeName: 'Tour trong ngày'
                                                  })}
                                                  detailPage={'DetailTourScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Tour trong ngày'}/>
                        <HorizontalScrollCategory data={this.state.recommendedMultipleDayTours}
                                                  showAllClicked={() => navigation.navigate('AllTourScreen', {
                                                      typeID: 1,
                                                      typeName: 'Tour nhiều ngày'
                                                  })}
                                                  detailPage={'DetailTourScreen'}
                                                  navigation={navigation}
                                                  categoryName={'Tour nhiều ngày'} />
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
        tourStates: state['tour']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, tour} = actions
    return {
        authActions: bindActionCreators(auth, dispatch),
        tourActions: bindActionCreators(tour, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Tour);
