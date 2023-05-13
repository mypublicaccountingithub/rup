import { configureStore } from '@reduxjs/toolkit';

//  slices
import pagination from './slices/pagination';
import app from './slices/app';


export const store = configureStore({
    reducer: {
        pagination: pagination,
        app: app,
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch