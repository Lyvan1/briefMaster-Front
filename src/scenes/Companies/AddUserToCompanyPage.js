import React, {useState} from 'react';
import {Modal, notification} from "antd";
import AddUserForm from "../../components/Users/AddUser/AddUserForm";
import userProvider from "../../dataProvider/userProvider";
import {useNavigate} from "react-router-dom";
import {FaUserCheck} from "react-icons/fa6";

function AddUserToCompanyPage({visible, setVisible, company}) {
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});

    const [notif, contextHolder] = notification.useNotification();
    const handleAddUser = async () => {
        try {
            const response = await userProvider.createUser(data);
            const status = response.status;
            const {firstname, lastname, company} = response.data;
            console.log('add user page', await response);
            if (status === 201) {
                notif.success({
                    message: `You've successfully added an user.`,
                    description: `${lastname} ${firstname} is added to ${company.name}`,
                    placement: 'top',
                    icon: (<FaUserCheck style={{color: 'white'}}/>),
                    style: {backgroundColor: '#05B112', borderRadius: '10px'},
                    className: 'custom-notification',
                    duration: 3
                })
                setTimeout(() => {
                    window.location.reload();
                }, 1500)
            }
        } catch (error) {
            console.log('add UserToCompanyPage', error);
            setErrors(error);
        }
        console.log(data);
    }
    return (
        <>
            {contextHolder}
            <Modal
                open={visible}
                centered
                onCancel={() => setVisible(false)}
                onOk={() => handleAddUser()}
                width={'90%'}
            >
                <AddUserForm company={company} data={data} setData={setData} errors={errors} setErrors={setErrors}/>
            </Modal>
        </>
    );
}

export default AddUserToCompanyPage;