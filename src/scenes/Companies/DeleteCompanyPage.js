import React from 'react';
import {Modal, notification} from "antd";
import companyProvider from "../../dataProvider/companyProvider";
import {FaBuildingCircleCheck} from "react-icons/fa6";


function DeleteCompanyPage({visible, setVisible, company}) {

    // Hook useNotification
    const [notif, contextHolder] = notification.useNotification();
    //Function to call deleteCompany from companyProvider
    const handleDeleteCompany = async () => {
        try {
            const response = await companyProvider.deleteCompany(company.id);
            console.log('delete company card', await response)
            if (response.status === 204) {
                setVisible(false);
                notif.success({
                    message: 'You\'ve deleted a company!',
                    description: 'The company and everything associated with it no longer appeared in the database.',
                    placement: 'top',
                    style: {backgroundColor: '#05B112', borderRadius: '10px'},
                    icon: (<FaBuildingCircleCheck style={{color: 'white'}}/>),
                    className: 'custom-notification',
                    duration: 3
                });
                setTimeout( () => {
                    window.location.reload();
                }, 1500)
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            {contextHolder}
            <Modal
                title={`Delete ${company.name} ?`.toUpperCase()}
                open={visible}
                onCancel={() => setVisible(false)}
                onOk={() => handleDeleteCompany()}
                centered={true}
                style={{padding: 0, height: 350}}

                okButtonProps={{style: {backgroundColor: '#f5222d', borderColor: '#f5222d', color: 'white'}}}
            >
                <p>
                    By clicking OK, this company will be deleted, along with all associated users, folders and projects.
                    This is irreversible.
                </p>
            </Modal>
        </>
    )
        ;
}

export default DeleteCompanyPage;