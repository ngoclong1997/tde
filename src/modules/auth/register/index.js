/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 00:27
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {actions} from '../../../middleware'
import MyTextInput from "../../common/MyTextInput";
import * as Yup from 'yup'
import Button from "../../common/Button";
import {Formik} from "formik";
import {Colors} from "../../../utils/styles";
import LoadingDialog from "../../common/LoadingDialog";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

import logoWhite from '../../../../images/logo_white.png'
import {NavigationActions, StackActions} from "react-navigation";

const deviceWidth = Math.round(Dimensions.get('window').width)

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Tên đăng nhập không được bỏ trống")
        .min(5, "Độ dài tối thiểu 5")
        .max(32, "Độ dài tối đa 32"),
    password: Yup.string()
        .required("Mật khẩu không được bỏ trống")
        .min(5, "Độ dài tối thiểu 5")
        .max(32, "Độ dài tối đa 32"),
    phone: Yup.string()
        .required("Số điện thoại không được bỏ trống")
        .min(9, "Độ dài tối thiểu 9")
        .max(11, "Độ dài tối đa 11"),
    name: Yup.string()
        .required("Họ tên không được bỏ trống")
        .min(5, "Độ dài tối thiểu 5")
        .max(50, "Độ dài tối đa 50")
});

class Register extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    _handleSubmit = async (values) => {
        this.setState({
            isLoading: true
        })
        const {authActions, navigation} = this.props
        try {
            await authActions.createNewAccount(values.username, values.password, values.phone, values.name)
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'MainScreen'})]
            })
            navigation.dispatch(resetAction);
        } catch (err) {
            alert(err)
        } finally {
            this.setState({
                isLoading: false
            })
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <LoadingDialog text={'Logging in'} visible={this.state.isLoading}/>
                <KeyboardAwareScrollView style={styles.container} enableOnAndroid extraHeight={100}>
                    <Image style={styles.logo} source={logoWhite}/>
                    <View style={styles.loginContainer}>
                        <Formik initialValues={{username: '', password: '', name: '', phone: ''}}
                                onSubmit={(values) => this._handleSubmit(values)}
                                validationSchema={validationSchema}>
                            {(formikProps) => (
                                <View>
                                    <MyTextInput autoCapitalize={'none'} placeholder={'Tên đăng nhập'}
                                                 onChangeText={formikProps.handleChange('username')}
                                                 onBlur={formikProps.handleBlur('username')}/>
                                    {formikProps.errors.username && formikProps.touched.username
                                        && (<Text style={styles.error}>{formikProps.errors.username}</Text>)}

                                    <MyTextInput secureTextEntry autoCapitalize={'none'} placeholder={'●●●●●●●●'}
                                                 onChangeText={formikProps.handleChange('password')}
                                                 onBlur={formikProps.handleBlur('password')}/>
                                    {formikProps.errors.password && formikProps.touched.password
                                    && (<Text style={styles.error}>{formikProps.errors.password}</Text>)}

                                    <MyTextInput secureTextEntry autoCapitalize={'none'} placeholder={'Họ tên'}
                                                 onChangeText={formikProps.handleChange('name')}
                                                 onBlur={formikProps.handleBlur('name')}/>
                                    {formikProps.errors.name && formikProps.touched.name
                                    && (<Text style={styles.error}>{formikProps.errors.name}</Text>)}

                                    <MyTextInput secureTextEntry autoCapitalize={'none'} placeholder={'Số điện thoại'}
                                                 onChangeText={formikProps.handleChange('phone')}
                                                 onBlur={formikProps.handleBlur('phone')}/>
                                    {formikProps.errors.phone && formikProps.touched.phone
                                    && (<Text style={styles.error}>{formikProps.errors.phone}</Text>)}

                                    <Button onPress={() => formikProps.handleSubmit()} title={'Đăng ký'}/>
                                </View>
                            )}
                        </Formik>


                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    error: {
        marginLeft: 20,
        color: Colors.RED,
        fontWeight: 'bold'
    },
    loginContainer: {

    },
    logo: {
        width: deviceWidth/3,
        height: deviceWidth/3,
        resizeMode: 'contain',
        alignSelf: 'center'
    }
})

const mapStateToProps = (state) => {
    return {
        authStates: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    const {auth} = actions
    return {
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
