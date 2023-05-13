import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";


interface initialStateType {
    activityId: number | null,
    artifactId: number | null,
    showArtifactDocsModal: boolean,
}

const initialState: initialStateType = {
    activityId: null,
    artifactId: null,
    showArtifactDocsModal: false,
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
        changeShowArtifactDocsModal: (state,action: PayloadAction<boolean>) => {
            state.showArtifactDocsModal = action.payload;
        }
    }
})



export const { changeActivityId,changeArifactId,changeShowArtifactDocsModal } = appSlice.actions;
export default appSlice.reducer



