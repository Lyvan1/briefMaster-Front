import React, {useRef, useState} from 'react';
import {Table, Radio, Checkbox, Card, Row, Col, Button, Space, Input} from "antd";
import {UsersTableColumns} from "./UsersTableColumns";
import {SearchOutlined} from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
function UsersTable({usersList}) {

    const handleChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    };



    const rowSelection = {
        columnWidth: 50,
        onChange: handleChange,
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User', // Ajoutez cela selon votre logique
            name: record.name,
        }),

    };

    // mapper les résultats stcker dans le state userList
    const dataSource = usersList !== {} ? usersList.map((user) => {
        return ({
            key: user.id,
            id: user.id,
            company: user.company.name,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            position: user.roles,
        });
    }) : {};

    return (
        <>
            <Row justify={'center'} align={'middle'} style={{marginLeft: '-30px', width: '100%'}}>
                <Col>

                    <Table rowSelection={rowSelection}
                           onSelectedChange={(selectedRowKeys, selectedRows) => handleChange(selectedRowKeys, selectedRows)}
                           dataSource={dataSource}
                           columns={UsersTableColumns}
                           rowHoverable
                           pagination={false}
                           virtual
                           scroll={{
                               x: '100%',
                               y: '100vh'
                           }}
                    />


                </Col>


            </Row>
        </>
    );
}

export default UsersTable;
