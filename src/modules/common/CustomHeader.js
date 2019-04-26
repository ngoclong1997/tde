import React, {Component} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import {Header} from 'react-navigation'
import {Colors} from "../../utils/styles";
import MyText from "./MyText";
import {Icon, Image, SearchBar,} from "react-native-elements";
import logoImage from '../../../images/logo.png'
import {Text} from "./index";
import {TouchableRipple} from "react-native-paper";
import * as Animatable from 'react-native-animatable'

class CustomHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchKey: '',
            shouldShowSearchBar: false
        }
    }

    updateSearch = value => {
        this.setState({searchKey: value})
    };

    // componentDidMount(){
    //     console.log(this.props)
    // }

    _handleSearchClick = () => {
        if (!this.state.shouldShowSearchBar) {
            this.slideInRight()
        }
        this.setState({shouldShowSearchBar: !this.state.shouldShowSearchBar, searchKey: ''})
    }

    _handleSearchRef = ref => this.search = ref

    slideInRight = () => this.search.slideInRight(50)

    render() {
        return (
            <View style={styles.headerBox}>

                <TouchableWithoutFeedback
                    onPress={() => this._handleSearchClick()}>
                    <View style={styles.searchIconBox}>
                        <Icon name={'search'} size={30}
                              color={this.state.shouldShowSearchBar ? Colors.APP_MAIN : Colors.WHITE}/>
                    </View>
                </TouchableWithoutFeedback>



                <Animatable.View ref={this._handleSearchRef} style={{position: 'absolute', zIndex: 3, height: 56, justifyContent: 'center'}}>
                    {this.state.shouldShowSearchBar && <SearchBar
                        containerStyle={styles.searchBarContainer}
                        placeholder="Type Here..."
                        onChangeText={(value) => this.updateSearch(value)}
                        value={this.state.searchKey}
                        platform={'android'}
                        inputStyle={styles.searchBarInput}
                        placeholderTextColor={Colors.APP_MAIN}
                        searchIcon={null}
                        clearIcon={null}
                        autoFocus={true}
                        onBlur={() => this._handleSearchClick()}
                        onCancel={() => this._handleSearchClick()}
                    />}
                </Animatable.View>
                <Header {...this.props}/>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBox: {
        backgroundColor: Colors.APP_MAIN,
        height: 56,
    },
    logoImage: {
        width: 40,
        height: 40,
        resizeMode: 'contain',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.WHITE
    },
    searchIconBox: {
        position: 'absolute',
        top: 13,
        right: 10,
        zIndex: 2
    },
    searchBarContainer: {
        height: 40,
        justifyContent: 'center',
        marginHorizontal: 10,
        width: Dimensions.get('window').width - 20,
        zIndex: 3,
        backgroundColor: Colors.WHITE,
    },
    searchBarInput: {
        color: Colors.APP_MAIN,
        padding: 0
    }
})

CustomHeader.propTypes = {};

export default CustomHeader;