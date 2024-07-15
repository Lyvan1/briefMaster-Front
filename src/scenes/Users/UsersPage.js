import React, {useEffect, useState} from 'react';
import userProvider from "../../dataProvider/userProvider";
import UsersTable from "../../components/Users/UsersList/UsersTable";

const UsersPage = () => {
    const [usersList, setUsersList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);


    useEffect(() => {
        ( async () => {
            try {
                const response = await userProvider.getUsers(currentPage);
                setTotalItems(response.totalItems);
                setUsersList(response.items);
                console.log('users page response', response);
            } catch (e) {

            }
        })();
    }, [currentPage]);
    return (
        <>
            <UsersTable
                usersList={usersList} setUsersList={setUsersList} currentPage={currentPage} totalItems={totalItems} />
        </>
    );
};

export default UsersPage;