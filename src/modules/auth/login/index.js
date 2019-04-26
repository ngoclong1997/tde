
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
        .required("Username is required")
        .min(3, "Minimum 3")
        .max(32, "Maximum 32"),
    password: Yup.string()
        .required("Password is required")
        .min(3, "Minimum 3")
        .max(32, "Maximum 32")
});

class Login extends Component {

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
            await authActions.loginWithUsernameAndPassword(values.username, values.password)
            this.setState({
                isLoading: false
            })
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
                        <Formik initialValues={{username: '', password: ''}}
                                onSubmit={(values) => this._handleSubmit(values)}
                                validationSchema={validationSchema}>
                            {(formikProps) => (
                                <View>
                                    <MyTextInput autoCapitalize={'none'} placeholder={'Tên đăng nhập'}
                                                 onChangeText={formikProps.handleChange('username')}
                                                 onBlur={formikProps.handleBlur('username')}/>
                                    {
                                        formikProps.errors.username && formikProps.touched.username
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.username}
                                            </Text>
                                        )
                                    }
                                    <MyTextInput secureTextEntry autoCapitalize={'none'} placeholder={'●●●●●●●●'}
                                                 onChangeText={formikProps.handleChange('password')}
                                                 onBlur={formikProps.handleBlur('password')}/>
                                    {
                                        formikProps.errors.password && formikProps.touched.password
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.password}
                                            </Text>
                                        )
                                    }
                                    <Button onPress={() => formikProps.handleSubmit()} title={'Đăng nhập'}/>
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
        width: deviceWidth/2,
        height: deviceWidth/2,
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
)(Login);
