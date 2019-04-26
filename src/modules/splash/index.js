import React, {Component} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux';
import {actions} from "../../middleware";
import {bindActionCreators} from "redux";
import {Colors} from "../../utils/styles";
import * as Progress from 'react-native-progress'

import logoWhite from '../../../images/logo_white.png'
import {NavigationActions, StackActions} from "react-navigation";
import MyText from "../common/MyText";

const deviceWidth = Math.round(Dimensions.get('window').width)

class Splash extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    async componentDidMount() {
        const {authActions, authStates, navigation} = this.props
        try {
            await authActions.initialApp()
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'AuthScreen'})]
            })
            navigation.dispatch(resetAction);
        } catch (err) {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'AuthScreen'})]
            })
            navigation.dispatch(resetAction);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={logoWhite} style={styles.logoImage} />
                <View style={styles.loadingBox}>
                    <MyText style={styles.loadingText}>Đang tải dữ liệu...</MyText>
                    <Progress.Bar width={200} indeterminate={true} color={'white'} />
                    <MyText style={styles.version}>Phiên bản 0.1</MyText>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.APP_MAIN,
        alignItems: 'center'
    },
    logoImage: {
        width: deviceWidth/2,
        height: deviceWidth/2,
        resizeMode: 'contain'
    },
    loadingBox: {
        position:'absolute',
        bottom: 30,
        alignItems: 'center'
    },
    version: {
        color: Colors.WHITE,
        fontSize: 15,
        paddingTop: 10
    },
    loadingText: {
        paddingBottom: 5,
        color: Colors.WHITE,
    }

})


const mapStateToProps = (state) => {
    return {
        authStates: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    const { auth } = actions
    return {
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash);
