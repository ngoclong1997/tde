import React from 'react'
import {TouchableWithoutFeedback} from 'react-native'
import {createStackNavigator, createAppContainer} from 'react-navigation'
import Home from './Home'
import HotDeal from './hotdeal'
import Place from './place'
import Restaurant from './restaurant'
import Room from './room'
import Schedule from './schedule'
import Social from './social'
import Tour from './tour'
import Vehicle from './vehicle'
import Weather from './weather'
import AllRoom from './room/AllRoom'
import {Colors} from "../../../utils/styles";
import RoomDetail from "./room/RoomDetail";
import AllRestaurant from "./restaurant/AllRestaurant";
import RestaurantDetail from "./restaurant/RestaurantDetail";
import AllTour from "./tour/AllTour";
import TourDetail from "./tour/TourDetail";
import AllHotDeal from "./hotdeal/AllHotDeal";
import HotDealDetail from "./hotdeal/HotDealDetail";
import AllPlace from "./place/AllPlace";
import PlaceDetail from "./place/PlaceDetail";
import CustomHeader from "../../common/CustomHeader";
import {Icon} from "react-native-elements";
import DetailSchedule from "./schedule/DetailSchedule";

const transitionConfig = () => {
    return {
        screenInterpolator: sceneProps => {
            const {position, layout, scene} = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
                outputRange: [width, 0, 0]
            })
            return {transform: [{translateX}]}
        },
    }
}

const HomeNavigator = createStackNavigator({
    HomeScreen: {
        screen: Home,
        navigationOptions: {
            header: null
        }
    },
    RoomScreen: {
        screen: Room,
        navigationOptions: {
            title: 'Phòng nghỉ'
        }
    },
    AllRoomScreen: {
        screen: AllRoom
    },
    DetailRoomScreen: {
        screen: RoomDetail,
        navigationOptions: {
            header: null
        }
    },
    RestaurantScreen: {
        screen: Restaurant,
        navigationOptions: {
            title: 'Nhà hàng'
        }
    },
    AllRestaurantScreen: {
        screen: AllRestaurant
    },
    DetailRestaurantScreen: {
        screen: RestaurantDetail,
        navigationOptions: {
            header: null
        }
    },
    HotDealScreen: {
        screen: HotDeal,
        navigationOptions: {
            title: 'Giá giờ CHÓT'
        }
    },
    AllHotDealScreen: {
        screen: AllHotDeal
    },
    DetailHotDealScreen: {
        screen: HotDealDetail,
        navigationOptions: {
            header: null
        }
    },
    ScheduleScreen: {
        screen: Schedule,
        navigationOptions: {
            title: 'Tra lịch trình'
        }
    },
    DetailScheduleScreen: {
        screen: DetailSchedule,
        navigationOptions: {
            title: 'Lịch trình chi tiết'
        }
    },
    SocialScreen: {
        screen: Social
    },
    TourScreen: {
        screen: Tour,
        navigationOptions: {
            title: 'Tour du lịch'
        }
    },
    AllTourScreen: {
        screen: AllTour
    },
    DetailTourScreen: {
        screen: TourDetail,
        navigationOptions: {
            header: null
        }
    },
    VehicleScreen: {
        screen: Vehicle,
        navigationOptions: {
            title: 'Phương tiện'
        }
    },
    AllVehicleScreen: {
        screen: AllTour
    },
    DetailVehicleScreen: {
        screen: TourDetail,
        navigationOptions: {
            header: null
        }
    },
    WeatherScreen: {
        screen: Weather,
        navigationOptions: {
            title: 'Thời tiết'
        }
    },
    PlaceScreen: {
        screen: Place,
        navigationOptions: {
            title: 'Địa danh'
        }
    },
    AllPlaceScreen: {
        screen: AllPlace
    },
    DetailPlaceScreen: {
        screen: PlaceDetail,
        navigationOptions: {
            header: null
        }
    },
}, {
    portraitOnlyMode: true,
    initialRouteName: 'HomeScreen',
    defaultNavigationOptions: ({navigation, screenProps}) => ({
        header: props => <CustomHeader {...props}/>,
        headerStyle: {
            backgroundColor: Colors.APP_MAIN,
            elevation: 0,
            shadowOpacity: 0
        },
        headerLeft: <TouchableWithoutFeedback onPress={() => navigation.goBack(null)}>
            <Icon style={{zIndex: 10}}
                  color={Colors.WHITE}
                  type={'evilicon'}
                  name={'chevron-left'} size={45}/>
        </TouchableWithoutFeedback>,
        headerTintColor: Colors.WHITE,
    }),
    headerMode: 'screen',
    transitionConfig
})

export default createAppContainer(HomeNavigator)
