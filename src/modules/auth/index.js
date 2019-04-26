/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 00:27
 */

import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import Login from './login'
import Register from './register'
import {Link} from "../common";
import {Colors} from "../../utils/styles";


class Authentication extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLogin: true
        }
    }

    _changeTab() {
        this.setState({
            isLogin: !this.state.isLogin
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLogin ? <Login navigation={this.props.navigation}/> :
                    <Register navigation={this.props.navigation}/>}
                {this.state.isLogin ?
                    <Link text={"Bạn chưa có tài khoản? "} linkText={"Đăng ký"} onPress={() => this._changeTab()}/> :
                    <Link text={"Bạn đã có tài khoản? "} linkText={"Đăng nhập"} onPress={() => this._changeTab()}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: Colors.APP_MAIN
    }
})


export default Authentication
