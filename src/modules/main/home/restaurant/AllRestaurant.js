import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import ProductCardFluid from "../../../common/ProductCardFluid";

import RestaurantDemoImage from "../../../../../images/khach-san.jpg";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class AllRestaurant extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            loaded: false
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('typeName', 'abc')
    })

    async componentDidMount() {
        const {restaurantActions, navigation} = this.props
        try {
            const typeID = await navigation.getParam('typeID', null)
            let data = await restaurantActions.getRestaurantsByType(typeID)
            await this.setState({
                data: data
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

        return (
            this.state.loaded ?
                <ScrollView>
                    <View style={styles.container}>
                        {this.state.data.map((item, idx) => {
                            return <ProductCardFluid key={idx} data={item}
                                                     onPress={() => this.props.navigation.navigate('DetailRestaurantScreen', {data: item})}/>
                        })}
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
        restaurantActions: bindActionCreators(restaurant, dispatch),
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllRestaurant);
