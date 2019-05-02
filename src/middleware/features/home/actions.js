
import * as types from './types'
import {HomeAPI} from "../../../utils/api";


const actionCreator = {
    getRecommendedServicesSucceed(recommendedServices) {
        return {
            type: types.GET_RECOMMENDED_SERVICES_SUCCEED,
            recommendedServices
        }
    },
    getRecommendedServicesFailed(error) {
        return {
            type: types.GET_RECOMMENDED_SERVICES_FAILED,
            error1
        }
    }
}

const actionMiddleware = {
    getRecommendedServices() {
        return async (dispatch) => {
            try {
                let response = await HomeAPI.getRecommendedServices()
                dispatch(actionCreator.getRecommendedServicesSucceed(response.data))
                return Promise.resolve(response.data)
            } catch (err) {
                dispatch(actionCreator.getRecommendedServicesFailed(response.data))
                return Promise.reject(err)
            }
        }
    },
}

const actions = Object.assign(actionCreator, actionMiddleware)

export default actions