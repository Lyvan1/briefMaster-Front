import {createSlice} from '@reduxjs/toolkit'
import  {jwtDecode} from 'jwt-decode';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        value: !!localStorage.getItem('token'),
        currentUser: localStorage.getItem('token') !== null ? jwtDecode(localStorage.getItem('token')) : null
    },
    reducers: {
        login: state => {
            state.value = true;
        },
        logout: state => {
            state.value = false;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
})

// Action creators are generated for each case reducer function
export const {login, logout, setCurrentUser} = authSlice.actions

export default authSlice.reducer