import React, {useEffect, useState} from 'react';
import {Modal, notification, Tabs} from "antd";
import FormUpdateCompany from "../../components/Companies/EditCompany/FormUpdateCompany/FormUpdateCompany";
import companyProvider from "../../dataProvider/companyProvider";
import {FaBuildingCircleCheck} from "react-icons/fa6";

const EditCompanyPage = ({visible, setVisible, company}) => {

    // State for validation errors. used as props in <FormUpdateCompany /> component
    const [errors, setErrors] = useState({});

    // State for form Data.  used as props in <FormUpdateCompany /> component
    const [data, setData] = useState({});

    //activ tab management
    const [activeTabKey, setActiveTabKey] = useState('1');

    const items = [
        {
            key: '1',
            label: 'Company\'s details',
            children: <FormUpdateCompany errors={errors} setErrors={setErrors} data={data} setData={setData} company={company}/>,
        },
        {
            key: '2',
            label: 'Company\'s briefs',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Company\'s projects',
            children: 'Content of Tab Pane 3',
        },
    ];

// set the active tab value in the state
    const changeTab = (activeKey) => {
        setActiveTabKey(activeKey);
    }



    const handleEdit = async () => {

        try {
            const response = await companyProvider.patchCompany(data, company.id)
            console.log('response from editCompany page', await response);
            if (response.status === 200) {
                notif.success({
                    message: 'You\'ve updated a company!',
                    description: 'New company information now available.',
                    placement: 'top',
                    style: {backgroundColor: '#05B112', borderRadius: '10px'},
                    icon: (<FaBuildingCircleCheck style={{color: 'white'}}/>),
                    className: 'custom-notification',
                    duration: 3
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1500)
            }
        } catch (error) {
            console.log('error from editCompanyPage', error)
        }
    }
    const [notif, contextHolder] = notification.useNotification();

    const handleOk = () => {
        switch (activeTabKey) {
            case '1':
                handleEdit();
                break;
            case '2':
                alert('onglet2');
                break;
            case '3':
                alert('onglet3');
                break;
            default:
                console.log('Aucun onglet actif correspondant, ou onglet non pris en charge.');
                alert('Aucun onglet actif correspondant.');
        }
    }
    return (
        <>
            {contextHolder}
            <Modal
                title={`${company.name}`.toUpperCase()}
                open={visible}
                onCancel={() => setVisible(false)}
                width={'100%'}
                centered={true}
                onOk={(e) => handleOk(e)}

            >
                <Tabs destroyInactiveTabPane={true} defaultActiveKey="1" items={items}
                      onChange={(activeKey) => changeTab(activeKey)}/>


            </Modal>
        </>
    );
};

export default EditCompanyPage;