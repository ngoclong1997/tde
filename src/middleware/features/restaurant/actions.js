

import * as types from './types'
import {RestaurantAPI} from "../../../utils/api";


const actionCreator = {}

const actionMiddleware = {
    getRestaurantsByType(typeID) {
        return async (dispatch) => {
            try {
                const data = await RestaurantAPI.getRestaurantsByType(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }

    },
    getRecommendedRestaurants(typeID) {
        return async (dispatch) => {
            try {
                const data = await RestaurantAPI.getTopRecommendedRestaurants(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions