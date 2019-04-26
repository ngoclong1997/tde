import React from 'react'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import * as modules from './modules'
//
// const transitionConfig = () => {
//     return {
//         screenInterpolator: sceneProps => {
//             const { position, scene } = sceneProps
//
//             const thisSceneIndex = scene.index
//
//             const opacity = position.interpolate({
//                 inputRange: [thisSceneIndex - 1, thisSceneIndex],
//                 outputRange: [0, 1],
//             })
//
//             return { opacity }
//         },
//     }
// }

const AppNavigator = createStackNavigator({
    SplashScreen: {
        screen: modules.Splash
    },
    AuthScreen: {
        screen: modules.Auth
    },
    MainScreen: {
        screen: modules.Main
    }
}, {
    portraitOnlyMode: true,
    initialRouteName: 'MainScreen',
    navigationOptions: {},
    headerMode: 'none'
})

export default createAppContainer(AppNavigator)
