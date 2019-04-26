import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, ScrollView, ToastAndroid} from 'react-native';

import demoImage from '../../../../../images/khach-san.jpg'
import {Button, Icon, Rating} from "react-native-elements";
import {Colors} from "../../../../utils/styles";
import MyText from "../../../common/MyText";
import MyActivityIndicator from "../../../common/MyActivityIndicator";

class VehicleDetail extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            loaded: false,
            liked: false
        }
    }

    async componentDidMount() {
        const {navigation} = this.props
        const data = await navigation.getParam('data', null)
        this.setState({
            data: data,
            loaded: true
        })
    }


    render() {
        return (
            this.state.loaded ?
                <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <View style={styles.backButton}>
                            <Icon onPress={() => this.props.navigation.goBack()} size={40} color={Colors.APP_MAIN} name={'chevron-left'}/>
                        </View>
                        <Image style={styles.image} source={demoImage}/>

                    </View>
                    <View style={styles.nameBox}>
                        <MyText numberOfLines={2} style={styles.name}>
                            {this.state.data['name']}
                        </MyText>
                        <Rating
                            readonly={true}
                            onFinishRating={this.ratingCompleted}
                            imageSize={20}
                            style={{paddingVertical: 5, alignSelf: 'flex-start'}}
                            startingValue={3}
                        />
                        <View style={styles.reactionBox}>
                            <View style={styles.row}>
                                <View style={styles.reaction}>
                                    <Icon onPress={() => this.setState({liked: !this.state.liked})} name={'heart'}
                                          color={this.state.liked ? Colors.RED : Colors.GREY} size={28}
                                          type={"font-awesome"}/>
                                    <MyText>Like</MyText>
                                </View>
                                <View style={[styles.reaction, {paddingLeft: 15}]}>
                                    <Icon name={'map-marker'} color={Colors.APP_MAIN_BOLD} size={28}
                                          type={"font-awesome"}/>
                                    <MyText>Check in</MyText>
                                </View>
                            </View>
                            <View>
                                <Button onPress={() => ToastAndroid.show("Đã thêm vào mục quan tâm", ToastAndroid.LONG)} type={"outline"} buttonStyle={{borderColor: Colors.APP_MAIN, borderWidth: 1}}
                                        titleStyle={{color: Colors.APP_MAIN, padding: 10}} title={"Quan tâm"}/>
                            </View>
                        </View>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.contentBox}>
                            <Text style={styles.description}>{this.state.data['description']}</Text>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>Khoảng giá: </Text>
                                <MyText style={styles.info}>10.000.000đ - 15.000.000đ</MyText>
                            </View>
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>Vị trí: </Text>
                                <MyText style={styles.info}>Cách Hà Nội 69km về phía Nam</MyText>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                :
                <MyActivityIndicator/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    imageBox: {
        width: '100%',
        height: 220
    },
    contentBox: {
        flex: 1,
        padding: 10
    },
    row: {
        flexDirection: 'row',

    },
    reaction: {
        alignItems: 'center'
    },
    backButton: {
        position: 'absolute',
        top: 5,
        left: 5,
        zIndex: 2
    },
    nameBox: {
        padding: 10
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.APP_MAIN
    },
    description: {
        textAlign: 'justify'
    },
    reactionBox: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    infoTitle: {
        fontWeight: 'bold',
        fontSize: 15
    },
    info: {
        fontSize: 15
    },
    infoBox: {
        flexDirection: 'row',
        paddingTop: 10
    }

})

export default VehicleDetail;