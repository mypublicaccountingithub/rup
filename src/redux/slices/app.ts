import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";


interface initialStateType {
    activityId: number | null,
    artifactId: number | null,
    artifactTitle: string | null,
    showArtifactDocsModal: boolean,
    activityTitle: string | null
}

const initialState: initialStateType = {
    activityId: null,
    artifactId: null,
    artifactTitle: null,
    showArtifactDocsModal: false,
    activityTitle: null
}


export const appSlice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        changeActivityId: (state,action: PayloadAction<number>) => {
            state.activityId = action.payload;
        },
        changeArifactId: (state,action: PayloadAction<number>) => {
            state.artifactId = action.payload;
        },
        changeArtifactTitle: (state, action:PayloadAction<string>)=>{
            state.artifactTitle = action.payload;
        },
        changeActivityTitle: (state, action:PayloadAction<string>)=>{
            state.activityTitle = action.payload;
        },
        changeShowArtifactDocsModal: (state,action: PayloadAction<boolean>) => {
            state.showArtifactDocsModal = action.payload;
        }
    }
})



export const { changeActivityId,changeArifactId,changeShowArtifactDocsModal, changeActivityTitle, changeArtifactTitle } = appSlice.actions;
export default appSlice.reducer



