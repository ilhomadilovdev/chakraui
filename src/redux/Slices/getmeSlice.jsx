
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../baseUrl/url"


const initialState = {
    user: null,
    isLoading: false,
    status: null,
    token: localStorage.getItem('token')
}

export const getMe = createAsyncThunk(
    'login/getMe',
    async () => {
        try {
            const response = await axios.get('/accounts/me')

            console.log("meyyyyyyyyy", response.data.data)
            return response.data
        } catch (error) {
            console.log(error)
        }
    },
)



export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true
            state.status = null
        })
            .addCase(getMe.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = null
                state.user = action.payload.data.user
                state.token = action.payload?.data.token
            })
            .addCase(getMe.rejected, (state, action) => {
                state.status = action.payload.message
                state.isLoading = false
            })


    },



})


export const checkIsauth = state => Boolean(state.auth.token)

export default loginSlice.reducer
