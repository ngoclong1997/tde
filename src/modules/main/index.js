import React from 'react'
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements'
import Home from './home'
import NewsFeed from './newsfeed'
import {Colors} from "../../utils/styles";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

const RouteConfig = {
    HomeTab: {
        screen: Home,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon type='font-awesome' name='home' color={tintColor}/>
            ),
            title: 'Tính năng'
        })
    },
    NewsFeedTab: {
        screen: NewsFeed,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon type='font-awesome' name='rss' color={tintColor}/>
            ),
            title: 'Mạng xã hội'
        })
    },
    HotNews: {
        screen: NewsFeed,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon type='font-awesome' size={30} name='home' color={Colors.RED}/>
            ),
            title: 'Tin HOT'
        })
    },
    Profile: {
        screen: NewsFeed,
        navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon type='font-awesome' size={30} name={'user'} color={tintColor}/>
            ),
            title: 'Trang cá nhân'
        })
    }
}

const BottomTabNavigatorConfig = {
    initialRouteName: 'HomeTab',
    shifting: true,
    activeColor: Colors.WHITE,
    inactiveColor: Colors.APP_MAIN_BOLD,
    barStyle: { backgroundColor: Colors.APP_MAIN },

    // tabBarOptions: {
    //     style: {
    //         backgroundColor: Colors.APP_MAIN,
    //         borderTopWidth: 2,
    //         borderTopColor: Colors.ORANGE
    //     },
    //     showLabel: false,
    // },
}

const MainTab = createMaterialBottomTabNavigator(RouteConfig, BottomTabNavigatorConfig);
export default MainTab
