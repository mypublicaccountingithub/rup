import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";


interface initialStateType {
    currentPage: number,
    perPage: number,
    count: number,
    totalPages: number,
}

const initialState:initialStateType = {
    currentPage:1,
    perPage: 5,
    count: 0,
    totalPages: 0,
}


export const paginationSlice = createSlice({
    name:"pagination",
    initialState: initialState,
    reducers:{
        changeCurrentPage:(state, action:PayloadAction<number>)=>{
            state.currentPage = action.payload;
        },
        changePerPage: (state, action:PayloadAction<number>) =>{
            state.perPage = action.payload;
        },
        changeCount: (state, action:PayloadAction<number>) =>{
            state.count = action.payload;
        },
        changeTotalPages: (state, action:PayloadAction<number>)=>{
            state.totalPages = action.payload;
        }
    }
})



export const { changeCurrentPage, changePerPage, changeCount, changeTotalPages } = paginationSlice.actions;


//  selectores
export const selectCurrentPage = (state: RootState) => state.pagination.currentPage;
export const selectPerPage = (state:RootState) => state.pagination.perPage;
export const selectCount = (state: RootState) => state.pagination.count;
export const selectTotalPages = (state: RootState) => state.pagination.totalPages;


export default paginationSlice.reducer



