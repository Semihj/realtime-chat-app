import {combineReducers, configureStore} from "@reduxjs/toolkit";
import UserReducer from "./user/user.js"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
    user:UserReducer,
})

const persistConfig = {
    key:"root",
    storage,
    version:1
}
const reducer = persistReducer(persistConfig,rootReducer);

export const store =  configureStore({
    
    reducer:reducer
})

export const persister = persistStore(store)