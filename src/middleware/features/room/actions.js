/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 01:06
 */

import * as types from './types'
import {RoomAPI} from "../../../utils/api";


const actionCreator = {}

const actionMiddleware = {
    getRoomsByType(typeID) {
        return async (dispatch) => {
            try {
                const rooms = await RoomAPI.getRoomsByType(typeID)
                return Promise.resolve(rooms)
            } catch (err) {
                return Promise.reject(err)
            }
        }

    },
    getRecommendedRooms(typeID) {
        return async (dispatch) => {
            try {
                const rooms = await RoomAPI.getTopRecommendedRooms(typeID)
                return Promise.resolve(rooms)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions