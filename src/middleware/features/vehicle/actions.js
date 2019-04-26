

import * as types from './types'
import {VehicleAPI} from "../../../utils/api";


const actionCreator = {}

const actionMiddleware = {
    getVehiclesByType(typeID) {
        return async (dispatch) => {
            try {
                const data = await VehicleAPI.getVehiclesByType(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }

    },
    getRecommendedVehicles(typeID) {
        return async (dispatch) => {
            try {
                const data = await VehicleAPI.getTopRecommendedVehicles(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions