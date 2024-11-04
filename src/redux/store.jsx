import { configureStore } from '@reduxjs/toolkit'
import authSlice from "../redux/Slices/authSlice"
import loginSlice from "../redux/Slices/getmeSlice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        login: loginSlice
    },
})