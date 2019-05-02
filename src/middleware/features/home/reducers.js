
import * as types from './types'

const initialState = {
    recommendedServices: [],
    error: null
}

function home(state = initialState, action) {
    switch (action.type) {
        case types.GET_RECOMMENDED_SERVICES_SUCCEED: 
            return {recommendedServices: action.recommendedServices, err: null}
        case types.GET_RECOMMENDED_SERVICES_FAILED:
            return {recommendedServices: [], err: action.error}
        default:
            return state
    }
}

export default home

