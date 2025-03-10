import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    darkMode: localStorage.getItem('darkMode')
        ? true : false
}

const modeSlice = createSlice({
    name: 'modeSlice',
    initialState: initialState,
    reducers: {
        setMode: (state, action) => {
            state.darkMode = action.payload

        }

    }
})

export const { setMode } = modeSlice.actions
export default modeSlice.reducer