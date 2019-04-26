

import * as types from './types'
import {TourAPI} from "../../../utils/api";


const actionCreator = {}

const actionMiddleware = {
    getToursByType(typeID) {
        return async (dispatch) => {
            try {
                const data = await TourAPI.getToursByType(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }

    },
    getRecommendedTours(typeID) {
        return async (dispatch) => {
            try {
                const data = await TourAPI.getTopRecommendedTours(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions