import {combineReducers, legacy_createStore as createStore} from 'redux'
import loginReducer from './reducers/login_reducer'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}


const allReducer = combineReducers({
    user: loginReducer,
})

const persistedReducer = persistReducer(persistConfig, allReducer)

let store = createStore(persistedReducer)
let persistor = persistStore(store)

export default store
export {persistor}