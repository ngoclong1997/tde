import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Image, Dimensions} from 'react-native'
import Text from "./MyText";
import PropTypes from 'prop-types'
import {Rating} from 'react-native-elements'

import RestaurantImage from '../../../images/khach-san.jpg'
import {Colors} from "../../utils/styles";


class ProductCard extends Component {

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
                        <Text numberOfLines={1} style={styles.itemName}>{data['name']}</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Rating
                    readonly={true}
                    onFinishRating={this.ratingCompleted}
                    imageSize={15}
                    style={{paddingVertical: 5}}
                    startingValue={3}
                />
                <Text style={styles.discountPrice}>{data['price'] + 'đ'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: 200,

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
        height: '90%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    discountPrice: {
        color: Colors.RED,
        fontWeight: 'bold',
        fontSize: 15
    },
    itemName: {
        fontWeight: 'bold',
        fontSize: 13,
        textAlign: 'center',
        marginHorizontal: 5
    },
    wrapper: {
        alignItems: 'center',
        // backgroundColor: Colors.WHITE,
        // borderRadius: 10,
        width: Dimensions.get('window').width/2.0-10,
        height: '70%',
        padding: 5,
    },
    discountPercentText: {
        color: Colors.WHITE,
        fontWeight: 'bold'
    }
})

ProductCard.propTypes = {
    data: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
};

export default ProductCard;