import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import ProductCardFluid from "../../../common/ProductCardFluid";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class AllHotDeal extends Component {

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
        const {hotdealActions, navigation} = this.props
        try {
            const typeID = await navigation.getParam('typeID', null)
            let data = await hotdealActions.getHotDealsByType(typeID)
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
                                                     onPress={() => this.props.navigation.navigate('DetailHotDealScreen', {data: item})}/>
                        })}
                    </View>
                </ScrollView>
                :
                <MyActivityIndicator />
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
        hotdealActions: bindActionCreators(hotdeal, dispatch),
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AllHotDeal);
