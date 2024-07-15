import { configureStore } from '@reduxjs/toolkit'
import authReducer from './reducer/auth'

export default configureStore({
    reducer: {
        auth: authReducer
    }
})