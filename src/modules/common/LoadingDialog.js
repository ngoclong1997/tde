import React, {Component} from 'react';
import {View, ActivityIndicator, Modal, StyleSheet, Text} from 'react-native'
import PropTypes from 'prop-types';

class LoadingDialog extends Component {
    render() {
        const {visible, text} = this.props
        return (
            <Modal
                visible={visible}
                transparent
                onRequestClose={() => null}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{text}</Text>
                        <ActivityIndicator style={styles.loader} size="large"/>
                    </View>
                </View>
            </Modal>
        );
    }
}

LoadingDialog.propTypes = {
    text: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        padding: 35,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        marginTop: 10,
    },
})

export default LoadingDialog
