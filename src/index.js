import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './output.css'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import {Layout} from 'antd'
import store from './store'
import {Provider} from "react-redux";


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <Layout style={{
            minHeight: '100vh',
            background: 'radial-gradient(circle, rgba(13,96,252,1) 0%, rgba(5,75,166,1) 100%)',
        }}>

            <Provider store={store}>
                <App/>
            </Provider>

        </Layout>
    </BrowserRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
