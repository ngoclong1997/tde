import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Social from './Social'

const transitionConfig = () => {
    return {
        screenInterpolator: sceneProps => {
            const { position, layout, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            })

            return { transform: [{ translateX }] }
        },
    }
}

const SocialNavigator = createStackNavigator({
    SocialScreen: {
        screen: Social
    }
}, {
    portraitOnlyMode: true,
    initialRouteName: 'SocialScreen',
    navigationOptions: {},
    headerMode: 'none',
    transitionConfig
})

export default createAppContainer(SocialNavigator)
