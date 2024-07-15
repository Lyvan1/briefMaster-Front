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


const companyProvider = {

    getCompanies: async (page, search) => {
        const searchParam = page !== null ? ( search ? `&name=${search}` : '') : ( search ? `?name=${search}` : '');
        const pageParam = page !== null ? `?page=${page}` : '';
        try {
            const response = await api.get(`/companies${pageParam}${searchParam}`);
            // console.log('dataprovider response', response)

            if (!response.data) {
                return new Error("No data received from the server");
            }
            return {
                items: response.data['hydra:member'],
                totalItems: response.data['hydra:totalItems'],
            };

        } catch (error) {
            console.log('data provider error', error.response.data);
            throw error;
        }
    },

    createCompany: async (data) => {
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
    },

    patchCompany: async (data, id) => {
        try {
            const response = await api.post(`/companies/${id}?_method=PATCH`,
                data, {
                    headers: {'content-type': 'multipart/form-data'}
                });

            console.log('response company provider', await response);
            return response;
        } catch (error) {
            console.log('data provider error', error.response.data.error);
            throw error.response.data.error;
        }
    },

    deleteCompany: async (idCompany) => {
        try {
            const response = await api.delete(`/companies/${idCompany}`);
            console.log('response company provider', await response);
            return response;
        } catch (error) {
            console.log('data provider error', error);
        }
    }
}


export default companyProvider;