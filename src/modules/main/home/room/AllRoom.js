import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import ProductCardFluid from "../../../common/ProductCardFluid";

import RestaurantDemoImage from "../../../../../images/khach-san.jpg";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class AllRoom extends Component {



    constructor(props) {
        super(props)
        this.state = {
            rooms: [],
            loaded: false
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: navigation.getParam('typeName', 'abc')
    })

    async componentDidMount() {
        const {roomActions, navigation} = this.props
        try {
            const typeID = await navigation.getParam('typeID', null)
            let rooms = await roomActions.getRoomsByType(typeID)
            await this.setState({
                rooms: rooms
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
                        {this.state.rooms.map((room, idx) => {
                            return <ProductCardFluid key={idx} data={room}
                                                     onPress={() => this.props.navigation.navigate('DetailRoomScreen', {data: room})}/>
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
        roomStates: state['room']
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth, room} = actions
    return {
        roomActions: bindActionCreators(room, dispatch),
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllRoom);
