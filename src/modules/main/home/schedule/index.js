import React, {Component} from 'react'
import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../../middleware'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MyText from "../../../common/MyText";
import MyTextInput from "../../../common/MyTextInput";
import Button from "../../../common/Button";
import {Formik} from "formik";
import * as Yup from "yup";
import {Colors} from "../../../../utils/styles";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const validationSchema = Yup.object().shape({
    startPlace: Yup.string()
        .required("Username is required"),
    desPlace: Yup.string()
        .required("Password is required"),
    numberOfAdults: Yup.number("Số lượng người lớn phải là số")
        .min(0),
    numberOfChildren: Yup.number("Số lượng trẻ em phải là số")
        .min(0),
    numberOfBabies: Yup.number("Số lượng em bé phải là số")
        .min(0),
    movingVehicle: Yup.string()
        .required("Vehicle is required")


});

class Schedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mapRegion: null,
            latitude: null,
            longitude: null,
            error: null,
            loaded: false
        }
    }

    _handleSubmit = async (values) => {
        alert(JSON.stringify(values))
        this.props.navigation.navigate('DetailScheduleScreen')
    }

    onRegionChange = (region) => {
        this.setState({mapRegion: region});
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                    loaded: true,
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
        );

    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView style={styles.container} enableOnAndroid extraHeight={100}>
                    <View style={styles.scheduleBox}>
                        <Formik initialValues={{
                            startPlace: '',
                            desPlace: '',
                            numberOfAdults: 0,
                            numberOfChildren: 0,
                            numberOfBabies: 0,
                            movingVehicle: ''
                        }}
                                onSubmit={(values) => this._handleSubmit(values)}
                                validationSchema={validationSchema}>
                            {(formikProps) => (
                                <View>
                                    <MyTextInput reverseColor={true} placeholder={'Điểm bắt đầu'}
                                                 onChangeText={formikProps.handleChange('startPlace')}
                                                 onBlur={formikProps.handleBlur('startPlace')}/>
                                    {
                                        formikProps.errors.startPlace && formikProps.touched.startPlace
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.startPlace}
                                            </Text>
                                        )
                                    }
                                    <MyTextInput reverseColor={true} placeholder={'Điểm đến'}
                                                 onChangeText={formikProps.handleChange('desPlace')}
                                                 onBlur={formikProps.handleBlur('desPlace')}/>
                                    {
                                        formikProps.errors.desPlace && formikProps.touched.desPlace
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.desPlace}
                                            </Text>
                                        )
                                    }
                                    <MyTextInput keyboardType={'number-pad'} reverseColor={true}
                                                 placeholder={'Số lượng người lớn'}
                                                 onChangeText={formikProps.handleChange('numberOfAdults')}
                                                 onBlur={formikProps.handleBlur('numberOfAdults')}/>
                                    {
                                        formikProps.errors.numberOfAdults && formikProps.touched.numberOfAdults
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.numberOfAdults}
                                            </Text>
                                        )
                                    }
                                    <MyTextInput keyboardType={'number-pad'} reverseColor={true}
                                                 placeholder={'Số lượng trẻ em'}
                                                 onChangeText={formikProps.handleChange('numberOfChildren')}
                                                 onBlur={formikProps.handleBlur('numberOfChildren')}/>
                                    {
                                        formikProps.errors.numberOfChildren && formikProps.touched.numberOfChildren
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.numberOfChildren}
                                            </Text>
                                        )
                                    }
                                    <MyTextInput keyboardType={'number-pad'} reverseColor={true}
                                                 placeholder={'Số lượng em bé'}
                                                 onChangeText={formikProps.handleChange('numberOfBabies')}
                                                 onBlur={formikProps.handleBlur('numberOfBabies')}/>
                                    {
                                        formikProps.errors.numberOfBabies && formikProps.touched.numberOfBabies
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.numberOfBabies}
                                            </Text>
                                        )
                                    }
                                    <MyTextInput reverseColor={true}
                                                 placeholder={'Phương tiện di chuyển'}
                                                 onChangeText={formikProps.handleChange('movingVehicle')}
                                                 onBlur={formikProps.handleBlur('movingVehicle')}/>
                                    {
                                        formikProps.errors.movingVehicle && formikProps.touched.movingVehicle
                                        && (
                                            <Text style={styles.error}>
                                                {formikProps.errors.movingVehicle}
                                            </Text>
                                        )
                                    }
                                    <Button reverseColor={true} onPress={() => formikProps.handleSubmit()}
                                            title={'Tiếp theo'}/>
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
    },
    mapBox: {
        width: '100%',
        height: Dimensions.get('window').height / 3.5
    },
    scheduleBox: {
        padding: 10,
        flex: 1
    },
    scheduleInfoBox: {
        flexDirection: 'row'
    },
    scheduleInfoName: {
        fontWeight: 'bold',
    },
    scheduleInfoValue: {
        flex: 1
    },
    error: {
        marginLeft: 20,
        color: Colors.RED,
        fontWeight: 'bold'
    },
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
)(Schedule);
