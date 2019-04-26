import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image} from 'react-native'
import Text from "./MyText";
import PropTypes from 'prop-types'
import {Rating} from 'react-native-elements'

import RestaurantImage from '../../../images/khach-san.jpg'
import {Colors} from "../../utils/styles";

class ProductCardFluid extends Component {

    ratingCompleted(rating) {
        // alert(rating)
    }

    render() {
        const {data, onPress} = this.props
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={onPress}>
                    <View style={styles.wrapper}>
                        <View style={styles.discountPercent}>
                            <Text style={styles.discountPercentText}>{'-' + data['discount'] + '%'}</Text>
                        </View>
                        <Image source={data['imageSource']} style={styles.image}/>
                        <Text numberOfLines={2} style={styles.itemName}>{data['name']}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Rating
                    readonly={true}
                    onFinishRating={this.ratingCompleted}
                    imageSize={25}
                    style={{paddingVertical: 5}}
                    startingValue={3}
                />
                <Text style={styles.discountPrice}>{'Giá khuyến mãi: ' + data['price'] + 'đ'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // height: 260,
        marginBottom: 20
    },
    discountPercent: {
        borderRadius: 50,
        backgroundColor: Colors.RED,
        width: 40,
        height: 40,
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    discount: {
        color: Colors.RED
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    discountPrice: {
        color: Colors.RED,
        fontWeight: 'bold',
        fontSize: 18
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 5
    },
    wrapper: {
        alignItems: 'center',
        width: '100%',
        padding: 5,
    },
    discountPercentText: {
        color: Colors.WHITE,
        fontWeight: 'bold'
    }
})

ProductCardFluid.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
};

export default ProductCardFluid;