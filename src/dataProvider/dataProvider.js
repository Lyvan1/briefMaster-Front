import env from 'react-dotenv'
import Cookies from 'js-cookie'
import axios from 'axios'
import {useDispatch} from "react-redux";
import {logout, setCurrentUser} from "../store/reducer/auth";

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

const dataProvider = {

    // Handle authentication
    login: async (credentials) => {
        try {
            const response = await api.post('/login_check', credentials);
            console.log(response)
            //destructuring
            const {token, refresh_token} = response.data;

            //Stockage
            localStorage.setItem('token', token);
            Cookies.set('refreshToken', refresh_token, {});

            return response;
        } catch (error) {
            return (error.response.data);
        }
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/logged')
            return response.data;
        } catch (error) {
            return error
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        Cookies.remove('refreshToken')
        const origin = window.location.origin;
        window.location.href = `${origin}/login`;
    },

    // handle refresh access token
    refreshToken: async () => {

        const refreshToken = Cookies.get('refreshToken')
        const data = {"refresh_token": refreshToken}

        try {
            localStorage.removeItem('token');
            const response = await api.post('/token/refresh', JSON.stringify({"refresh_token": refreshToken}))
            console.log('response response', response);
            const {token} = response.data;

            localStorage.setItem('token', token);

            alert('refrshing')
            window.location.reload()
        } catch (error) {
            console.log('merde', error)
            console.log(Cookies.get('refreshToken'))
        }

    },

    getUser: async () => {
        try {

            const userList = await api.get('/users');
            console.log('test user', userList);
            return userList;

        } catch (error) {

            return error;

        }
    },

    /*getCompanies: async (page, search) => {
        const searchParam = search ? `&name=${search}` : "";
        try {
            const response = await api.get(`/companies?page=${page}${searchParam}`);
            console.log('dataprovider response', response)

            if (!response.data) {
                throw new Error("No data received from the server");
            }
            return {
                items: response.data['hydra:member'],
                totalItems: response.data['hydra:totalItems'],
            };

        } catch (error) {
            console.log('data provider error', error.response.data);
            throw error;
        }
    },*/

   /* createCompany: async (data) => {
        try {
            const response = await api.post('/companies', data, {
                headers: {'content-type': 'multipart/form-data'}
            });
            console.log('dataprovider response', response);

            if (!response.data) {
                throw new Error("No data received from the server");
            }
            return response.data;

        } catch (error) {
            console.log('data provider error', error.response.data.error);
            throw error.response.data.error;
        }
    },*/

   /* patchCompany: async (id, data) => {
        try {
            const response = await api.post(`/companies/${id}?_method=PATCH`,
                data, {
                    headers: {'content-type': 'multipart/form-data'}
                });
        } catch (error) {
            console.log('data provider error', error.response.data.error);
            throw error.response.data.error;
        }
    }*/
}
export default dataProvider;

