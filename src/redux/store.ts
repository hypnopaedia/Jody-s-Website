import { combineReducers, Store } from "redux";
import Home from './Home/slice';
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';

/* Root State */
const rootReducer = combineReducers({
    Home
});

/* Store */
const store = configureStore({
    reducer: rootReducer
});

/* Typed Hooks */
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;