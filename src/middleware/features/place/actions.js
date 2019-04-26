
import * as types from './types'
import {PlaceAPI} from "../../../utils/api";


const actionCreator = {}

const actionMiddleware = {
    getPlacesByType(typeID) {
        return async (dispatch) => {
            try {
                const data = await PlaceAPI.getPlacesByType(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }

    },
    getRecommendedPlaces(typeID) {
        return async (dispatch) => {
            try {
                const data = await PlaceAPI.getTopRecommendedPlaces(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions