/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 01:06
 */

import * as types from './types'
import {UserAPI} from "../../../utils/api";


const actionCreator = {
    resetAuth() {
        return {
            type: types.AUTH_RESET
        }
    },
    authSucceed(user) {
        return {
            type: types.AUTH_SUCCEED,
            user
        }
    },
    authFailed(error) {
        return {
            type: types.AUTH_FAILED,
            error
        }
    }
}

const actionMiddleware = {
    loginWithUsernameAndPassword(username, password) {
        return async (dispatch) => {
            try {
                let response = await UserAPI.loginWithUsernameAndPassword(username, password)
                dispatch(actionCreator.authSucceed(response.data))
                return Promise.resolve(response.data)
            } catch (err) {
                dispatch(actionCreator.authFailed(err))
                return Promise.reject(err)
            }
        }
    },
    createNewAccount(username, password, phone, name) {
        return async (dispatch) => {
            try {
                let response = await UserAPI.createNewAccount(username, password, phone, name)
                return Promise.resolve(response.data)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    },
    initialApp() {
        return async (dispatch) => {
            try {
                await new Promise((resolve) => {
                    setTimeout(resolve, 2000)
                })
                return Promise.resolve(true)
            } catch (err) {
                return Promise.reject(err)
            }
        }
    }
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions