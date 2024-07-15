import React, {useState} from 'react';
import {Avatar, Button, Card, Col, Divider, Dropdown, Flex, Menu, Popconfirm, Row, Tooltip} from 'antd';
import Meta from 'antd/es/card/Meta';
import {items} from './DropdownItems'
import {UserOutlined, SettingOutlined, AntDesignOutlined} from '@ant-design/icons';
import {FaBuilding, FaPen, FaTrashCan, FaUserPlus} from "react-icons/fa6";
import AvatarGroup from "./AvatarGroup";
import EditCompanyPage from "../../../scenes/Companies/EditCompanyPage";
import env from 'react-dotenv'
import companyProvider from "../../../dataProvider/companyProvider";
import DeleteCompanyPage from "../../../scenes/Companies/DeleteCompanyPage";
import AddUserToCompanyPage from "../../../scenes/Companies/AddUserToCompanyPage";

const CompanyCard = ({company}) => {
    //State for modal edit compagny
    const [editModal, setEditModal] = useState(false);

    //State for modal delete company
    const [deleteModal, setDeleteModal] = useState(false);

    //State for add user Modal
    const [addUserModal, setAddUserModal] = useState(false);

    // Custom style for the header card part (with the settings button)
    const cardHeaderStyle = {
        border: '0' // Supprimer la bordure du header
    };

    // function to analyze image type, is it png or jpeg.
    const typeImg = (filename) => {
        if (filename && filename.includes('.')) {
            const extension = filename.match(/\.([^.]+)$/)?.[1]; // Extract file extension
            if (extension) {
                if (extension === 'jpeg' || extension === 'jpg') {
                    return 'data:image/jpeg;base64';
                } else if (extension === 'png') {
                    return 'data:image/png;base64';
                }
            }
        }
        // return an empty string if the extension is not png, jpeg or jpg
        return '';
    }

    // handle the company logo display (get the logo or a default User Icon)
    const displayCompanyLogo = company.logo === undefined ? (
        <Avatar size={100} icon={<FaBuilding/>}/>
    ) : (

        <Avatar style={{background:'white'}} size={100} icon={
            <img src={
                // `${typeImg(company.logo)},${company.logoBase64}`

                `${process.env.REACT_APP_URL}${company.logoUrl}`
            }
                 alt={`Logo ${company.name}`}
            />
        }/>

    );

    // Get a common format date from the datatimeImmutable given by the api
    const getFormatedDate = (datimeImmutable) => {
        const apiDate = new Date(datimeImmutable);

        const year = apiDate.getFullYear();
        const month = ('0' + (apiDate.getMonth() + 1)).slice(-2); // Ajouter un zéro devant si le mois est inférieur à 10
        const day = ('0' + apiDate.getDate()).slice(-2); // Ajouter un zéro devant si le jour est inférieur à 10

        const formatedDate = `${day} - ${month} - ${year}`
        return formatedDate;
    }

    // items for the dropdown menu
    const menuItems = items.map(item => ({
        key: item.key,
        label: item.label,
        icon: item.icon,
        danger: item.danger,
        onClick: () => {
            switch (item.key) {
                case '1':
                    setEditModal(true);
                    break;
                case '2':
                    setAddUserModal(true);
                    break;
                case'3':
                   setDeleteModal(true);
                    break;
            }
        }
    }));




    return (
        <>
            {/*// Modal for edit campaign*/}
            <EditCompanyPage visible={editModal} setVisible={setEditModal} company={company}/>

            {/*Modal for delete company*/}
            <DeleteCompanyPage visible={deleteModal} setVisible={setDeleteModal} company={company} />

            {/*Modal for add a user in this company*/}
            <AddUserToCompanyPage visible={addUserModal} setVisible={setAddUserModal} company={company} />
            <Card
                className={'text-center mt-5 border-radius rounded-xl'}
                style={{width: 300, padding: 0, height: 350}}
                hoverable
                cover={
                    <div style={{margin: 'auto', width: 'fit-content'}}>
                        {displayCompanyLogo}
                    </div>
                }
                styles={{header: cardHeaderStyle}} // customStyle here
                title={<h1 className={'text-left'}>{getFormatedDate(company.createdAt)}</h1>}
                extra={
                    <Dropdown menu={{items: menuItems}}
                              placement="bottomLeft"
                              trigger={['click']}

                    >

                        <Button type='text' shape='circle' icon={<SettingOutlined/>}/>
                    </Dropdown>
                }
            >

                <Meta title={company.name} description={company.country}/>
                <Divider/>

                <Row align={'middle'}>
                    <Col span={12} className={'text-left'}>
                        <span className={'block mb-1'}>Users</span>
                        <AvatarGroup company={company}/>
                    </Col>
                </Row>
            </Card>
        </>

    );
};

export default CompanyCard;