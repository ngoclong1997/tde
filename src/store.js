
import {reducers} from './middleware'
import thunk from 'redux-thunk'

import {createStore, combineReducers, applyMiddleware} from 'redux'

const rootReducer = combineReducers({
    ...reducers
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

const unsub = store.subscribe(() => {
    console.log(store.getState())
})

export default store

