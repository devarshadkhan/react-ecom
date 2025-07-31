import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { cartSlice, getAllCategoty, getAllProducts, getProductByIDSlice } from "./slices";


const rootReducer = combineReducers({
    getAllProducts:getAllProducts,
    getAllCategoty:getAllCategoty,
    getProductByIDSlice:getProductByIDSlice,
    cartSlice:cartSlice
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;
