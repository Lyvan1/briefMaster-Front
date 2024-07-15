import env from 'react-dotenv'
import Cookies from 'js-cookie'
import axios from 'axios'
import {useDispatch} from "react-redux";
import {logout, setCurrentUser} from "../store/reducer/auth";
import dataProvider from "./dataProvider";

// const baseURL = 'https://127.0.0.1:8002/briefApi';

const baseURL = process.env.REACT_APP_API_URL;
const api = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
        'accept': '*'
    }
});


//Request Interceptors
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
        console.log('ajout token bearer')
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

// Response Interceptors: catching the error when token expired
api.interceptors.response.use((response) =>
    response, error => {
    // Here we can do something if the response doesn't belong to 2XX code

    if (error.response && error.response.data.message === 'Expired JWT Token') {
        alert('intercept')
        dataProvider.refreshToken()
    }

    if (error.response && error.response.data.message === 'JWT Refresh Token Not Found') {
        alert('single use')
        dataProvider.logout()
    }


    return Promise.reject(error);
})

const userProvider =  {

    createUser : async (data) => {
        try {
            const response = await api.post('/users', data, {
                headers: {'content-type': 'multipart/form-data'}
            })
            console.log('response userProvider', await response);
            return response;
        } catch (error) {
            console.log('user provider error', error);
            throw error.response.data.error;
        }
    },

    getUsers: async (page) => {
        const pageParam = page !== null ? `?page=${page}` : '';
        try {

            const response = await api.get(`/users${pageParam}`);
            console.log('test user', response);
            return {
                items: response.data['hydra:member'],
                totalItems: response.data['hydra:totalItems'],
            };

        } catch (error) {

            return error;

        }
    },

    getRolesList: async () => {
        try {
            const response = await api.get('/users_roles');
            console.log('roooles', await response);
            if (!response.data) {
                return new Error('No data received from the server');
            }
            return {
                items: response.data['hydra:member'],
            };

        } catch (error) {
            console.log('data provider error', error.response.data);
            throw error;
        }
    }
}

export default userProvider;