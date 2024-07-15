import React, {useEffect, useState} from 'react';
import CompanyCard from "../../components/Companies/CompaniesList/CompanyCard";
import dataProvider from "../../dataProvider/dataProvider";
import {Col, Pagination, Row, Space, Spin} from "antd";
import {LoadingOutlined} from '@ant-design/icons';
import AddEntityButton from "../../components/Global/Buttons/AddEntityButton";
import {BsBuildingFillAdd} from "react-icons/bs";
import Search from "antd/es/input/Search";
import './companiesList.css'
import Mask from "../../components/Global/Mask/Mask";
import companyProvider from "../../dataProvider/companyProvider";


const CompaniesPage = () => {
    const [companiesList, setCompaniesList] = useState([]);
    const [searchTerm, setSearchTerm] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Fetch companies list, on component mounted phase
    useEffect(() => {
        (async () => {
            try {
                const response = await companyProvider.getCompanies(currentPage, searchTerm);
                setCompaniesList(response.items);
                setTotalItems(response.totalItems);
                console.log('companies page response', response);
            } catch (error) {
                console.error('Error fetching companies list', error);
            }
        })(); // IIFE (Immediately Invoked Function Expression)
    }, [currentPage, searchTerm]);



    const filteredCompanies = searchTerm ?
        companiesList.filter(company =>
            company.name.toLowerCase().includes(searchTerm)
        ) : companiesList


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }
    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <div style={{position:'relative', width:'100%'}}>
            <Row justify={{md:'space-between', xs:'center', sm: 'center'}} align={'middle'} gutter={16}
                 style={{position: 'sticky', top: 40, width: '100%', zIndex: 2,}}>
                <Col style={{marginLeft:'30px', textAlign:'center'}} align={{md:'start', xs:'middle', sm:'middle'}} xs={{flex: '100%'}} sm={{flex: '30%'}} md={{flex: '30%'}} className={'mt-3'}>
                    <AddEntityButton icon={<BsBuildingFillAdd/>} path={'/companies/add'}>Add New
                        Company</AddEntityButton>
                </Col>
                <Col  align={'end'} xs={{flex: '100%'}} sm={{flex: '60%'}} md={{flex: '50%'}} className={'mt-3'}>
                    <Search variant={'outlined'} size={'large'} onChange={(e) => {
                        handleSearch(e)
                    }}/>
                </Col>
            </Row></div>

            <Mask>
                <Row justify={'center'} align={'middle'} gutter={16}
                     style={{marginLeft: 0, marginRight: 0, overflowY: 'auto', height: '80vh', position: 'relative'}}>

                    {
                        companiesList.length !== 0 ? (

                            filteredCompanies.map((company, index) => (
                                <Col key={index} span={24} align={'middle'} xs={{flex: '100%'}} sm={{flex: '50%'}}
                                     md={{flex: '25%'}}>
                                    <CompanyCard key={company.id} company={company}/>
                                </Col>
                            ))
                        ) : (
                            <Col span={24} align={'middle'}>
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 50, display: 'block'
                                            }}
                                            spin

                                        />
                                    }
                                    fullscreen
                                />
                            </Col>
                        )
                    }
                </Row>
            </Mask>
            <Row width='100%' justify={'center'} align={'middle'} className='mt-5'>
                <Pagination
                    onChange={(event) => {
                        handlePaginationChange(event)
                    }}
                    defaultCurrent={1}
                    total={totalItems}
                    pageSize={15}
                    simple={{
                        readOnly: true,
                    }}
                />
            </Row>

        </>
    );
};

export default CompaniesPage;