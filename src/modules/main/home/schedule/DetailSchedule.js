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

class DetailSchedule extends Component {

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
                {this.state.loaded ? <MapView
                    provider={PROVIDER_GOOGLE}
                    // region={this.state.mapRegion}
                    // onRegionChange={(region) => this.onRegionChange(region)}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={styles.mapBox}
                >
                </MapView> : <View style={styles.mapBox}/>}
                <View style={styles.detailScheduleBox}>
                    <View style={styles.detailScheduleNameBox}>
                        <MyText style={styles.detailScheduleName}>Số phòng nghỉ: </MyText>
                        <MyText/>
                        <MyText style={styles.detailScheduleName}>Chi phí phòng: </MyText>
                        <MyText style={styles.detailScheduleName}>Chi phí di chuyển: </MyText>
                        <MyText style={styles.detailScheduleName}>Chi phí ăn uống: </MyText>
                        <MyText/>
                        <MyText style={styles.detailScheduleName}>Tổng chi phí: </MyText>
                    </View>
                    <View style={styles.detailScheduleNameBox}>
                        <MyText style={styles.detailScheduleValue}>5</MyText>
                        <MyText/>
                        <MyText style={styles.detailScheduleValue}>10.000.000đ</MyText>
                        <MyText style={styles.detailScheduleValue}>2.000.000đ</MyText>
                        <MyText style={styles.detailScheduleValue}>3.000.000đ</MyText>
                        <MyText/>
                        <MyText style={styles.detailScheduleValue}>15.000.000đ</MyText>
                    </View>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    detailScheduleNameBox: {
        width: 150
    },
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
    detailSchedule: {
        flexDirection: 'row'
    },
    detailScheduleBox: {
        flex: 1,
        padding: 10,
        flexDirection: 'row'
    },
    detailScheduleName: {
        fontSize: 18,

    },
    detailScheduleValue: {
        fontSize: 18,
        fontWeight: 'bold'
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
)(DetailSchedule);
