

import React, {Component} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {actions} from '../../../middleware'

class NewsFeed extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>This is NewsFeed</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    }
})

const mapStateToProps = (state) => {
    return {
        authStates: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    const { auth } = actions
    return {
        authActions: bindActionCreators(auth, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewsFeed);
