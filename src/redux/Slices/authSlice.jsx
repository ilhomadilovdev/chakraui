import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "../../baseUrl/url"


const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    status: null,
}



export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials) => {
        try {
            const { username, password } = credentials;
            const staticData = {
                deviceId: "string11",
                token: "string",
                language: "uz",
            }
            const response = await axios.post("/accounts/log-in", {
                ...staticData,
                login: username,
                password
            })

            if (response.status === 200 || response.status === 204) {
                const token = response.data.data.token;
                if (token) {
                    window.localStorage.setItem('token', token);
                    console.log("Received token:", token)
                }
            }

            return response.data;

        } catch (error) {
            return rejectWithValue(error.message);
        }

    },
)





export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        //Login
        builder.addCase(
            loginUser.pending, (state) => {
                state.isLoading = true
                state.status = null
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.status = action.payload.message
                state.user = action.payload.data.user
                state.token = action.payload.data.token

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = action.payload.message
                state.isLoading = false
            })





    },





    // getme

})




export const checkIsauth = state => Boolean(state.auth.token)

export default authSlice.reducer