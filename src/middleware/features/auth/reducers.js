/**
 * Created by WebStorm.
 * @author longnn
 * @date 04 Apr, 2019
 * @time 01:06
 */

import * as types from './types'

const initialState = {
    user: null,
    error: null,
    accessToken: null,
}

function auth(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_RESET: {
            return { ...state, user: null, error: null, accessToken: null }
        }
        case types.AUTH_SUCCEED: {
            return { ...state, user: action.user, error: null}
        }
        case types.AUTH_FAILED: {
            return { ...state, user: null, error: action.error, accessToken: null }
        }
        default:
            return state
    }
}

export default auth

