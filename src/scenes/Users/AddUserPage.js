import React, {useEffect, useState} from 'react';
import AddUserForm from "../../components/Users/AddUser/AddUserForm";
import {Button, Card, Col, notification, Row, Select} from "antd";
import companyProvider from "../../dataProvider/companyProvider";
import {FaBuildingCircleExclamation, FaUser, FaUserCheck} from "react-icons/fa6";
import debounce from 'lodash.debounce';
import userProvider from "../../dataProvider/userProvider";

const AddUserPage = () => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [notif, contextHolder] = notification.useNotification();
    const [companiesList, setCompaniesList] = useState([]);
    const [search, setSearch] = useState('');
    const [options, setOptions] = useState([]);

    // Custom style for the header card part (with the settings button)
    const cardHeaderStyle = {
        border: '0',// Supprimer la bordure du header

    };


    const getCompanies = async (searchText) => {
        try {
            const response = await companyProvider.getCompanies(null, searchText);
            console.log('response addUserPage', response);
            setCompaniesList(response.items);
        } catch (error) {
            console.log(error);
        }
    }

    // Use debounce to prevent  frequent API calls
    const debouncedGetCompanies = debounce((searchText) => {
        getCompanies(searchText);
    }, 300);

    //Lancer la recherche a chaque modif du state search
    useEffect(() => {
        if (search !== '') {
            debouncedGetCompanies(search);
        }
    }, [search]);

    // Modifier les options du select en fonction du paramètre de recherche et du résultat associé
    useEffect(() => {
        const newOptions = companiesList.map(company => ({
            value: company.id,
            label: company.name,
        }));
        setOptions(newOptions);
    }, [companiesList]);

    const handleSearch = (value) => {
        setSearch(value);
    }

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
            } else {
                notif.success({
                    message: 'An error occured.',
                    description: 'Please check for input errors and try again.',
                    placement: 'top',
                    style: {backgroundColor: 'red', borderRadius: '10px'},
                    icon: (<FaBuildingCircleExclamation style={{color: 'white'}}/>),
                    className: 'custom-notification',
                    duration: 3
                })
                console.error(response);
            }
        } catch (error) {
            console.log('add UserToCompanyPage error', error);
            setErrors(error);
        }
        console.log('daaaata', data)
    }

    return (
        <>
            {contextHolder}
            <Card title={'Create a user'}
                  styles={{header: cardHeaderStyle, title: {fontSize: '40px', textAlign: 'center'}}}// customStyle here
                  style={{paddingTop: '30px', paddingBottom: '30px', marginRight: '30px'}}
            >

                <Row justify={'center'} align={'middle'}>
                    <Col span={24}>


                        <AddUserForm data={data} setData={setData} errors={errors} setErrors={setErrors}
                                     options={options}
                                     handleSearch={handleSearch} companiesList={companiesList}/>

                    </Col>

                </Row>
                <Row justify={'end'} align={'bottom'} className={'mt-8'}>
                    <Col className={'px-5'}>
                        <Button variant={'outlined'} type={'primary'} size='large' style={{padding: ' 0 30px 0 30px'}}
                                onClick={handleAddUser}>Add</Button>
                    </Col>
                </Row>
            </Card>
        </>
    );
};

export default AddUserPage;
