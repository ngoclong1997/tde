import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Image, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import {Colors} from "../../utils/styles";
import RestaurantDemoImage from "../../../images/khach-san.jpg";
import ProductCard from "./ProductCard";
import Text from "./MyText";
import {Icon} from "react-native-elements";


class HorizontalScrollCategory extends Component {

    render() {
        const {categoryPicture, categoryName, showAllClicked, data, navigation, detailPage} = this.props
        return (
            <View style={styles.wrapper}>
                <View style={styles.categoryWrapper}>
                    <View style={styles.row}>
                        <View style={styles.categoryPictureWrapper}>
                            {categoryPicture === null ?
                                <Image style={styles.categoryPicture} source={categoryPicture}/> :
                                <Icon color={Colors.WHITE} name={'settings'}/>}
                        </View>
                        <Text style={styles.categoryName}>{categoryName}</Text>
                    </View>

                    <TouchableOpacity onPress={showAllClicked} style={styles.row}>
                        <Text style={styles.all}>Tất cả</Text>
                        <Icon name={'chevron-right'} color={Colors.LINK}/>
                    </TouchableOpacity>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {data.map((item, idx) => {
                        return <ProductCard key={idx} data={item}
                                            onPress={() => navigation.navigate(detailPage, {data: item})}/>
                    })}
                </ScrollView>
            </View>
        );
    }
}

//TODO: Navigate to ProductDetails. Can pass navigation

const styles = StyleSheet.create({
    categoryWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    wrapper: {
        height: 230,
        marginTop: 10,
    },
    scrollHorizontal: {},
    categoryPicture: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    categoryName: {
        fontWeight: 'bold',
        paddingLeft: 10,
        fontSize: 20
    },
    categoryPictureWrapper: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: Colors.ORANGE,
        alignItems: 'center',
        justifyContent: 'center'

    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: Colors.GREY,
        marginVertical: 5
    },
    all: {
        color: Colors.LINK,

        fontSize: 15
    },

})

HorizontalScrollCategory.propTypes = {
    categoryName: PropTypes.string.isRequired,
    categoryPicture: PropTypes.any,
    showAllClicked: PropTypes.func.isRequired,
    navigation: PropTypes.any.isRequired,
    data: PropTypes.array.isRequired,
    detailPage: PropTypes.string.isRequired
};

export default HorizontalScrollCategory;