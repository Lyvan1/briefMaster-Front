    import {Col, Layout, Row} from 'antd'
import Welcome from './scenes/auth'
import {Route, Routes, useNavigate} from 'react-router-dom'
import CompaniesPage from "./scenes/Companies/CompaniesPage";
import PrivateRoutes from "./components/Auth/PrivateRoutes/PrivateRoutes";
import Error404 from "./scenes/global/404/Error404";
import AddCompanyPage from "./scenes/Companies/AddCompanyPage";
import UsersPage from "./scenes/Users/UsersPage";
import AddUserPage from "./scenes/Users/AddUserPage";
import './notificationStyle.css';


const {Content} = Layout


function App() {
    return (
        <>
            <Routes>
                <Route path={'/Login'} element={<Welcome/>}/>
                <Route element={<PrivateRoutes />}>
                    <Route path={'/companies'} element={<CompaniesPage />} exact />
                    <Route path={'/companies/add'} element = {<AddCompanyPage />} exact/>
                    <Route path={'/users'} element={<UsersPage />} />
                    <Route path={'/users/add'} element={<AddUserPage />} exact />
                    <Route path={'*'} element={<Error404 />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
