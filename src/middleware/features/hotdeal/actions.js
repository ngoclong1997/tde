/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 01:06
 */

import * as types from './types'
import {HotDealAPI} from "../../../utils/api";


const actionCreator = {}

const actionMiddleware = {
    getHotDealsByType(typeID) {
        return async (dispatch) => {
            try {
                const data = await HotDealAPI.getHotDealsByType(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }

    },
    getRecommendedHotDeals(typeID) {
        return async (dispatch) => {
            try {
                const data = await HotDealAPI.getTopRecommendedHotDeals(typeID)
                return Promise.resolve(data)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions