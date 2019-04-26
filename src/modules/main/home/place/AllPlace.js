import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import ProductCardFluid from "../../../common/ProductCardFluid";

import PlaceDemoImage from "../../../../../images/khach-san.jpg";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class AllPlace extends Component {

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
        const {placeActions, navigation} = this.props
        try {
            const typeID = await navigation.getParam('typeID', null)
            let data = await placeActions.getPlacesByType(typeID)
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
                                                     onPress={() => this.props.navigation.navigate('DetailPlaceScreen', {data: item})}/>
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
        placeStates: state['place']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, place} = actions
    return {
        placeActions: bindActionCreators(place, dispatch),
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllPlace);
